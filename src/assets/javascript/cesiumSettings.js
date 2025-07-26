const settings = {
  viewer: {
    ionDefaultAccessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNmNjZDdjOS05ZmFhLTQ3NTItOTI5OS00NDMzN2Y0MzQwMTIiLCJpZCI6MjIxNjQ5LCJpYXQiOjE3MTgxNjIxMTV9.8N1NuOLwQDadOEF4X0m2z9SiTCR0e5OFYWUNV5WWU1U",
    showEarth: true,
    backgroundColor: "BLACK", // 要大階
    useGoogleMap: false,
    maximumZoomDistance: 10000000,
    minimumZoomDistance: 10
  },
  
  /* 視角 初始設定 */
  camera: {
    zoomType: "setView",  // setView / flyTo
    zoomTo: "coordinate", // coordinate / model(最後一個模型座標，適合無地圖時使用)
    x: 121.5342,          // \
    y: 25.287,            //  \
    z: 600,               //   \
    h: 0,                 //     zoomTo: "coordinate" 專用
    p: -0.75,             //   /
    r: 0,                 //  /
    flyDuration: 10,      // /  
  },
  
  /* 模型 初始設定 */
  model: {
    modelType: "local", // 使用 local / ion(banned)
    ModalArray: {
      initial: [
        {
          label: "building",
          file: "building",
          set: "building",
          x: 121.533,
          y: 25.2938,
          z: 0,
          h: 27,
          p: 0,
          r: 0,
          s: 3
        },
        // {
        //   label: "harbour",
        //   file: "harbour",
        //   x: 121.5372,
        //   y: 25.29257,
        //   z: 0,
        //   h: 90,
        //   p: 0,
        //   r: 0,
        //   s: 10.25
        // }
      ],
      building: [
        {
          label: "1F",
          file: "1F",
          x: 121.533,
          y: 25.2938,
          z: 0,
          h: 27,
          p: 0,
          r: 0,
          s: 3
        },{
          label: "1MF",
          file: "1MF",
          x: 121.533,
          y: 25.2938,
          z: 0,
          h: 27,
          p: 0,
          r: 0,
          s: 3
        },{
          label: "2F",
          file: "2F",
          x: 121.533,
          y: 25.2938,
          z: 0,
          h: 27,
          p: 0,
          r: 0,
          s: 3
        },{
          label: "3F",
          file: "3F",
          x: 121.533,
          y: 25.2938,
          z: 0,
          h: 27,
          p: 0,
          r: 0,
          s: 3
        },{
          label: "4F",
          file: "4F",
          x: 121.533,
          y: 25.2938,
          z: 0,
          h: 27,
          p: 0,
          r: 0,
          s: 3
        },{
          label: "RF",
          file: "RF",
          x: 121.533,
          y: 25.2938,
          z: 0,
          h: 27,
          p: 0,
          r: 0,
          s: 3
        }
      ]
    },
  },

  /* 巡邏起點座標 */
  patrol: {
    x: 121.5342,
    y: 25.28835,
    z: 100,
    h: 0,
    p: 0,
    r: 0,

    /* 巡邏路線 */
    route: [
      [0, 50], // 向前
      [90, 0], // 轉左
      [-90, 50] // 轉右 向前
    ]
  },

  /* 繪圖 袑始設定 */ 
  entity: {
    rectangleArray: [
      {
        w: 121.5332,
        s: 25.28734,
        e: 121.5342,
        n: 25.28834,
        opacity: 1,
        color: "GREEN",
      },
      {
        w: 121.5342,
        s: 25.28744,
        e: 121.5352,
        n: 25.28844,
        opacity: 0.5,
        color: "BLUE",
      },
    ],
    circleArray: [
      {
        x: 121.5342,
        y: 25.28835,
        z: 50,
        length1: 100,
        length2: 100,
        opacity: 0.5,
        color: "RED",
      },
      {
        x: 121.5342,
        y: 25.28835,
        z: 100,
        length1: 100,
        length2: 100,
        opacity: 0.5,
        color: "PURPLE",
      },
    ],
  },

  /* 是否使用 hover 效果 */
  other: {
    useHover: false,
  },
};

/* cesium viewer 內部設定*/
/* 地球 */
const hideEarth = {
  imageryProvider: false, // 禁用影像圖層
  terrainProvider: false, // 禁用地形圖層
};

/* 太空 */
const hideSpace = {
  skyBox: false, // false / 註解
};

/* Panel */
const hidePanel = {
  /* 隱藏 cesium panel */
  animation: false, // 隱藏動畫小部件
  baseLayerPicker: false, // 隱藏底圖選擇器
  fullscreenButton: false, // 隱藏全屏按鈕
  vrButton: false, // 顯示 VR 模式按鈕，預設為 false
  geocoder: false, // 隱藏地理編碼器
  homeButton: false, // 隱藏首頁按鈕
  infoBox: false, // 隱藏信息框
  sceneModePicker: false, // 隱藏場景模式切換按鈕
  selectionIndicator: false, // 隱藏選擇指示器
  timeline: false, // 隱藏時間軸
  navigationHelpButton: false, // 隱藏導航幫助按鈕
  navigationInstructionsInitiallyVisible: false, // 預設顯示導航說明，預設為 true
  creditContainer: document.createElement("div"), // 隱藏版權信息
};

export { settings, hidePanel, hideSpace, hideEarth };
