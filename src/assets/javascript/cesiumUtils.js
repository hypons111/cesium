import { ref, computed, nextTick } from "vue";
import * as Cesium from "cesium";
import axios from "axios";
import { settings, hidePanel, hideSpace, hideEarth } from "./cesiumSettings";
import store from "@/store/index"; // js 模塊要用這方法讀入 store
import GREEN_TAG from "@/assets/image/label_light1.png"; // 載入 billboard icon
import RED_TAG from "@/assets/image/label_light2.png"; // 載入 billboard icon
import SUCCESS_TAG from "@/assets/image/typeSuccessful.png"; // 載入 billboard icon
import WARNNING_TAG from "@/assets/image/typeWarnning.png"; // 載入 billboard icon

const allModel = store.getters.ALL_MODEL;
const currentModel = computed(() => store.getters.CURRENT_MODEL); // 正在顯示的模型
const currentModelSet = computed(() => store.getters.CURRENT_MODEL_SET); // 正在顯示的模型
const entityArray = []; // 全部模型的 entity
const tagEntity = []; // 全部 label 和 billboard 的 entity
/* 滑鼠右鍵跳出的 panel 位置 */
export const cesiumMenuData = ref({
  show: false,
  x: 0,
  y: 0,
  longitude: 0,
  latitude: 0,
  height: 0,
});
let featureHoverStatus = undefined;

/* 初始化 cesium */
export async function initialCesium() {
  window.viewer = await setViewer("viewerContainer"); // 建立 viewer
  await addGLTF(); // 加載模型
  await setMouseEventListener(); // 設定 event listener
}

/* 建立 viewer */
async function setViewer(container) {
  Cesium.Ion.defaultAccessToken = settings.viewer.ionDefaultAccessToken; // ion token
  const viewerConfig =
    settings.viewer.showEarth === true
      ? { ...hidePanel, ...hideSpace }
      : { ...hidePanel, ...hideSpace, ...hideEarth }; // 加入需要的 viewer 設定
  const viewer = new Cesium.Viewer(container, viewerConfig); // 套用 viewer 設定
  viewer.scene.backgroundColor = Cesium.Color[settings.viewer.backgroundColor]; // 移除太空底圖後的背景顏色
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = settings.viewer.maximumZoomDistance || 10000000; // 限制視點的最遠距離
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = settings.viewer.minimumZoomDistance || 0; // 限制視點的最近距離
  viewer.scene.globe.depthTestAgainstTerrain = true; // 啟用地形對深度測試
  // viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW; // 使用 2.5D 模式

  /* 使用 google 地圖時, 關閉 bing 地圖, 可加快載入 */
  if (settings.viewer.useGoogleMap) {
    viewer.scene.terrainProvider = true;
    viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(2275207) // remote model
    );
  }
  return viewer;
}

/* glTF 模型 */
async function addGLTF() {
  const camera = settings.camera;
  const model = settings.model;
  const set = currentModelSet.value;
  let entity = undefined;
  try {
    const modelSetting = model.ModalArray[set];
    let MODEL_URI = undefined;
    for (let i = 0; i < model.ModalArray[set].length; i++) {
      if (
        currentModel.value === "initial" ||
        currentModel.value === "" ||
        currentModel.value === allModel ||
        currentModel.value === model.ModalArray[set][i].label
      ) {
        /* 切換模型 */
        if (model.modelType === "local") {
          MODEL_URI = `./gltf/${model.ModalArray[set][i].file}.gltf`; // local model
        } else if (model.modelType === "ion") {
          MODEL_URI = await Cesium.IonResource.fromAssetId(
            model.ModalArray[set][i].file
          ); // ion model
        }
      }
      const position = Cesium.Cartesian3.fromDegrees(
        modelSetting[i].x,
        modelSetting[i].y,
        modelSetting[i].z
      );
      const heading = Cesium.Math.toRadians(modelSetting[i].h);
      const pitch = Cesium.Math.toRadians(modelSetting[i].p);
      const roll = Cesium.Math.toRadians(modelSetting[i].r);
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        new Cesium.HeadingPitchRoll(heading, pitch, roll)
      );
      entity = viewer.entities.add({
        position: position, // 模型位置
        orientation: orientation, // 模型角度
        KIN_label: model.ModalArray[set][i].label,
        KIN_file: model.ModalArray[set][i].file,
        KIN_set: model.ModalArray[set][i].set,
        model: {
          uri: MODEL_URI, // 模型路徑
          scale: modelSetting[i].s, // 模型大小
        },
      });
      entityArray.push(entity);
    }

    /* 鏡頭使用 模型/座標 */
    /* 請在 cesiumConfig.js 設定 */
    if (camera.zoomTo === "model") {
      viewer.trackedEntity = entity;
    } else if (camera.zoomTo === "coordinate") {
      console.log(camera)
      const destination = Cesium.Cartesian3.fromDegrees(
        camera.x,
        camera.y,
        camera.z
      ); // zoom 的位置, 可以是 model / Cartesian座標
      const orientation = new Cesium.HeadingPitchRange(
        camera.h,
        camera.p,
        camera.r
      );
      viewer.camera[camera.zoomType]({
        destination: destination,
        orientation: orientation,
        duration: camera.flyDuration
      });
    }
  } catch (error) {
    console.log(`[addGLTF() ERROR] : ${error}`);
  }
}

/* 滑鼠事件 */
function setMouseEventListener() {
  return new Promise((resolve, reject) => {
    try {
      const clickListener = new Cesium.ScreenSpaceEventHandler(
        viewer.scene.canvas
      );

      // 滑鼠左鍵
      clickListener.setInputAction((click) => {
        cesiumMenuData.value.show = false;
        const feature = viewer.scene.pick(click.position);
        if (feature) {
          switch (feature.primitive.constructor.name) {
            case "Model":
              const primitive = feature.primitive;
              store.commit("SET_HEADER_TITLE", primitive._id._KIN_label);
              if (primitive._id._KIN_set) {
                store.commit("SET_CURRENT_MODEL_SET", primitive._id._KIN_set);
                store.commit("SET_CURRENT_MODEL", "");
                store.commit("PUSH_MODEL_BREADCRUMB", primitive._id._KIN_set);
              } else {
                store.commit("SET_CURRENT_MODEL", primitive._id._KIN_file);
              }
              break;
            case "Label":
            case "Billboard":
              const value = {
                IS_SHOW: true,
                CONTENTS: feature.id.data,
              };
              store.commit("SET_MODAL_STATUS", value);
              break;
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 滑鼠右鍵
      clickListener.setInputAction(async (movement) => {
        try {
          const { x, y } = movement.position;
          const cartesian = viewer.scene.pickPosition(movement.position);
          const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          const longitude = Cesium.Math.toDegrees(cartographic.longitude);
          const latitude = Cesium.Math.toDegrees(cartographic.latitude);
          const height = cartographic.height < 0 ? 0 : cartographic.height;
          cesiumMenuData.value = {
            show: false,
            x: x,
            y: y,
            longitude: longitude,
            latitude: latitude,
            height: height,
          };
          nextTick(() => {
            cesiumMenuData.value.show = true;
          });
        } catch (error) {
          console.log(`[MOUSE RIGHT CLICK ERROR] : ${error}`);
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

      // hover
      if (settings.other.useHover) {
        clickListener.setInputAction(function (movement) {
          const feature = viewer.scene.pick(movement.endPosition);
          if (feature && feature.primitive.constructor.name === "Model") {
            entityArray.forEach((entity) => {
              entity.model.color = Cesium.Color.fromCssColorString(
                "rgba(250, 250, 250, 0.25)"
              );
            });
            feature.id.model.color = Cesium.Color.fromCssColorString(
              "rgba(255, 255, 255, 1)"
            );
            featureHoverStatus = true;
          } else if (featureHoverStatus !== undefined) {
            featureHoverStatus = undefined;
            entityArray.forEach((entity) => {
              entity.model.color = Cesium.Color.fromCssColorString(
                "rgba(255, 255, 255, 1)"
              );
            });
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      } else {
        entityArray.forEach((entity) => {
          entity.model.color = Cesium.Color.fromCssColorString(
            "rgba(255, 255, 255, 1)"
          );
        });
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

/* 取得 tag (label + billBoard) 資料並呼叫 addTagEntity() */
function fetchTagsAndHandle() {
  /* label 是文字 */
  /* billboard 是圖片，圖片要先用 `import from` 導入 */
  axios
    .get("./json/fake_tags.json")
    .then((response) => {
      response.data.tags.forEach((tag) => {
        addTagEntity(tag);
      });
    })
    .catch((error) => {
      console.log(`[fetchTagsAndHandle() ERROR] : ${error}`);
    });
}

/* 放置 tag (label + billBoard) */
export function addTagEntity(tag) {
  /* 用來選擇已載入的 billboard icon */
  const billBoardIcons = {
    GREEN_TAG: GREEN_TAG,
    RED_TAG: RED_TAG,
    SUCCESS_TAG: SUCCESS_TAG,
    WARNNING_TAG: WARNNING_TAG,
  };
  const entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(tag.x, tag.y, tag.z), // 實際與地面距離
    label: {
      text: tag.label,
      font: `${tag.s * 2.5}em Helvetica`,
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 3.5,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, 0 - tag.s * 170), // 與 billborad 距離
    },
    billboard: {
      image: billBoardIcons[tag.billboard],
      scale: tag.s,
      color: Cesium.Color.WHITE,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  });
  entity.data = tag;
  tagEntity.push(entity);
}

/* 移除 tag (label + billBoard) */
export function removeTagEntity() {
  tagEntity.forEach((tag) => {
    viewer.entities.remove(tag);
  });
  tagEntity.length = 0;
}

/* 加入 rectangle 範例 */
export async function addRectangleEntity_EXAMPLE() {
  const rectangleArray = settings.entity.rectangleArray;
  rectangleArray.forEach((rectangle) => {
    viewer.entities.add({
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
          rectangle.w,
          rectangle.s,
          rectangle.e,
          rectangle.n,
        ),
        material: Cesium.Color[rectangle.color].withAlpha(rectangle.opacity),
      },
    });
  });
}

/* 加入 ellipse 範例 */
export async function addCircleEntity_EXAMPLE() {
  const circleArray = settings.entity.circleArray;
  circleArray.forEach((circle) => {
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(circle.x, circle.y, 0),
      ellipse: {
        semiMinorAxis: circle.length1,
        semiMajorAxis: circle.length2,
        height: circle.z,
        material: Cesium.Color[circle.color].withAlpha(circle.opacity),
      },
    });
  });
}

/* 加入 ellipsoid 範例 */
export async function addEllipsoidEntity_EXAMPLE() {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(121.53952734804245, 25.29196755746243, 0),
    ellipsoid: {
      radii: new Cesium.Cartesian3(100, 100, 100),
      outline: true,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
      material: Cesium.Color.CYAN.withAlpha(0.5)
    },
  });
}

/* 加入 polyline 範例 */
export async function addPolylineEntity_EXAMPLE() {
  viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        121.53717761035917, 25.291781575982238, 1,
        121.53770712680753, 25.291655224909384, 1,
        121.53814538257055, 25.291702954220774, 1,
        121.53835982084358, 25.291771321351963, 1,
        121.53882423046551, 25.29126262675215, 1,
        121.53826994283008, 25.290791703013543, 1,
        121.53834495771378, 25.29034749139047, 1,
        121.53829898206095, 25.290216747626886, 1,
        121.5376189090744, 25.290283896320435, 1,
        121.53717761035917, 25.291781575982238, 1
      ]),
      width: 5,
      material: Cesium.Color.RED,
    },
  });
}

/* 巡邏 */
export async function patrolHandler() {
  cesiumMenuData.value.show = false;
  const patrol = settings.patrol;
  const destination = Cesium.Cartesian3.fromDegrees(
    patrol.x,
    patrol.y,
    patrol.z
  );
  const orientation = new Cesium.HeadingPitchRange(
    patrol.h,
    patrol.p,
    patrol.r
  );

  viewer.camera.setView({
    destination: destination,
    orientation: orientation,
  });

  for (const spot of patrol.route) {
    await rotateCamera(spot[0]);
    await moveForward(spot[1]);
  }
}

/* 巡邏視角旋轉 */
function rotateCamera(angle) {
  return new Promise((resolve, reject) => {
    let rotated = 0;
    const rotateStep = angle / 300; // 每次旋轉多少 (數字越大旋轉速度越慢)
    const rotationInterval = setInterval(() => {
      viewer.camera.lookLeft(Cesium.Math.toRadians(rotateStep));
      rotated += rotateStep;
      if (Math.abs(rotated) >= Math.abs(angle)) {
        clearInterval(rotationInterval);
        resolve();
      }
    }, 10); // 隔多少毫秒旋轉一次 (數字越大越不流暢)
  });
}

/* 巡邏視角向前 */
function moveForward(distance) {
  return new Promise((resolve, reject) => {
    let sCounter = 0;
    const moveInterval = setInterval(() => {
      viewer.camera.moveForward(1); // 每次移動多少 (數字越大移動距離越遠)
      sCounter++;
      if (sCounter >= distance) {
        clearInterval(moveInterval);
        resolve();
      }
    }, 50); // 隔多少毫秒移動一次 (數字越大越不流暢)
  });
}

/* 重設視角 */
export async function resetCamera() {
  cesiumMenuData.value.show = false;
  const camera = settings.camera;
  const destination = Cesium.Cartesian3.fromDegrees(
    camera.x,
    camera.y,
    camera.z
  );
  const orientation = new Cesium.HeadingPitchRange(
    camera.h,
    camera.p,
    camera.r
  );
  viewer.camera.setView({
    destination: destination,
    orientation: orientation,
  });
}

/* 移動視角 */
export async function setCamera(cameraData) {
  cesiumMenuData.value.show = false;
  const destination = Cesium.Cartesian3.fromDegrees(
    cameraData.x,
    cameraData.y,
    cameraData.z
  );
  const orientation = new Cesium.HeadingPitchRange(
    cameraData.h,
    cameraData.p,
    cameraData.r
  );
  viewer.camera.setView({
    destination: destination,
    orientation: orientation,
  });
}

/* 移動視角 */
export async function flyCamera(cameraData) {
  console.log(cameraData)
  cesiumMenuData.value.show = false;
  const destination = Cesium.Cartesian3.fromDegrees(
    cameraData.x,
    cameraData.y,
    cameraData.z
  );
  const orientation = new Cesium.HeadingPitchRange(
    cameraData.h,
    cameraData.p,
    cameraData.r
  );
  viewer.camera.flyTo({
    destination: destination,
    orientation: orientation,
  });
}

export default {
  cesiumMenuData,
  initialCesium,
  patrolHandler,
  resetCamera,
  setCamera,
  flyCamera,
  addTagEntity,
  addRectangleEntity_EXAMPLE,
  addCircleEntity_EXAMPLE,
  addEllipsoidEntity_EXAMPLE,
  addPolylineEntity_EXAMPLE,
  removeTagEntity
};

/* Forbidden Forbidden Forbidden Forbidden Forbidden */

/* 3D Tiles 模型 */
/* ion 資源：模型大小，角度，縮放在 cesium ion 上設定 */
// async function add3DTiles() {
//   try {
//     const camera = settings.camera;
//     let primitives = undefined;
//     let destination = undefined;
//     let orientation = new Cesium.HeadingPitchRange(
//       camera.h,
//       camera.p,
//       camera.r
//     );

//     /* 使用 local/ion 模型 */
//     /* 請在 cesiumConfig.js 設定 */
//     if (settings.model.modelType === "local") {
//       // local model
//       for (const model of settings.model.localModalArray) {
//         if (currentModel.value.fileName === "" || model.name === currentModel.value.fileName) {
//           // 切左換模型/顯示全部模型
//           const tileset = await Cesium.Cesium3DTileset.fromUrl(
//             `/3DTiles/${model.name}/tileset.json`
//           ); // 從 URL 加載 3D Tiles 數據
//           primitives = viewer.scene.primitives.add(tileset); // 將加載的數據集添加到 Cesium 的場景中的 primitives 物件
//           const cartographic = Cesium.Cartographic.fromCartesian(
//             tileset.boundingSphere.center
//           ); // cartographic ＝ 模型邊界盒中心點轉換成的經度、緯度、高度 (模型原始位置)
//           const original = Cesium.Cartesian3.fromRadians(
//             cartographic.longitude,
//             cartographic.latitude,
//             0.0
//           ); // original = cartographic 轉換成的笛卡兒座標
//           const offset = Cesium.Cartesian3.fromDegrees(
//             model.x,
//             model.y,
//             model.z
//           ); // offset = 計算新的偏移的笛卡兒坐標
//           const translation = Cesium.Cartesian3.subtract(
//             offset,
//             original,
//             new Cesium.Cartesian3()
//           ); // translation = 從原始位置到新位置的位移向量
//           tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation); // 套用 translation
//         }
//       }
//     } else if (settings.model.modelType === "ion") {
//       // ion model
//       for (const model of settings.model.ionModalArray) {
//         primitives = viewer.scene.primitives.add(
//           await Cesium.Cesium3DTileset.fromIonAssetId(model)
//         );
//       }
//     }

//     /* 鏡頭使用 模型/座標 */
//     /* 請在 cesiumConfig.js 設定 */
//     if (camera.zoomTo === "model" || !settings.viewer.showEarth) {
//       destination = primitives.boundingSphere.center; // 3D Tileset 包圍盒的中心位置
//     } else if (camera.zoomTo === "coordinate") {
//       destination = Cesium.Cartesian3.fromDegrees(camera.x, camera.y, camera.z); // zoom 的位置, 可以是 model / Cartesian座標
//     }

//     /* 鏡頭使用 set/fly 方法移動 */
//     /* 請在 cesiumConfig.js 設定 */
//     if (camera.zoomType === "setView") {
//       let offset = primitives.boundingSphere.radius * camera.setOffset;
//       viewer.camera.setView({
//         destination: destination,
//         orientation: orientation,
//       });
//       viewer.camera.moveBackward(offset); // 向後移動相機，設定距離
//     } else if (camera.zoomType === "flyTo") {
//       /* Cartesian3 相加函數 */
//       /* 3D Tileset 包圍盒的中心位 + offset */
//       destination = Cesium.Cartesian3.add(
//         destination,
//         new Cesium.Cartesian3(
//           camera.flyOffset[0],
//           camera.flyOffset[1],
//           camera.flyOffset[2]
//         ),
//         new Cesium.Cartesian3() // 這個參數不要刪除, 可提高效能
//       );
//       await viewer.scene.camera.flyTo({
//         destination: destination,
//         orientation: orientation,
//         duration: camera.flyDuration,
//       });
//     }
//   } catch (error) {
//     console.log(`[add3DTiles() ERROR] : ${error}`);
//   }
// }

/* 放置 label */
// function addLabel(tag) {
//   viewer.entities.add({
//     position: Cesium.Cartesian3.fromDegrees(tag.x, tag.y, tag.z), // 實際與地面距離
//     label: {
//       text: tag.label,
//       font: "24px Helvetica",
//       fillColor: Cesium.Color.WHITE,
//       outlineColor: Cesium.Color.BLACK,
//       outlineWidth: 2,
//       style: Cesium.LabelStyle.FILL_AND_OUTLINE,
//       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//       pixelOffset: new Cesium.Cartesian2(0, -50), // 與 billborad 距離
//     },
//   });
// }

/* 放置 billBoard */
// function addBillBoard(tag) {
//   viewer.entities.add({
//     position: Cesium.Cartesian3.fromDegrees(tag.x, tag.y, tag.z), // 實際與地面距離
//     billboard: {
//       image: tag.billboard,
//       scale: 0.05,
//       color: Cesium.Color.WHITE,
//       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//     },
//   });
// }
/* Forbidden Forbidden Forbidden Forbidden Forbidden */
