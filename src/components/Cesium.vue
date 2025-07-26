<template>
  <!-- 左上角 dropdown menu -->
  <div id="leftAside" class="aside">
    <!-- :disabled="isDisablePrveModel" -->
    <button @click="backTopPreviousModel">
      <font-awesome-icon :icon="['fas', 'door-closed']" />返回上一層
    </button>
  </div>

  <!-- <div id="leftAside" class="aside">
    <el-select class="el_select" v-model="value" :placeholder="placeholder" @change="switchModel(this)">
      <el-option v-for="item in leftAsideOptions" :key="item.label" :value="item.label" :label="item.label"
        :set="item.set" class="el_option">
      </el-option>
    </el-select>
  </div> -->

  <!-- 右上角 button group -->
  <div id="rightAside" class="aside">
    <button @click="resetCamera"><font-awesome-icon :icon="['fas', 'door-closed']" />重設</button>
    <button @click="patrolHandler"><font-awesome-icon :icon="['fas', 'door-closed']" />巡邏</button>
    <button @click="initialModel"><font-awesome-icon :icon="['fas', 'door-closed']" />初始化模型</button>
  </div>

  <!-- cesium -->
  <div id="cesium">
    <div id="viewerContainer"></div>
  </div>

  <!-- 點位 popup modal -->
  <div id="modalContainer" v-if="modalStatus.IS_SHOW">
    <Modal />
  </div>

  <!-- 滑鼠右鍵 panel -->
  <div id="menuContainer" @contextmenu.prevent :style="{ top: cesiumMenuData.y + 'px', left: cesiumMenuData.x + 'px' }"
    v-if="cesiumMenuData.show">
    <div id="CesiumMenu" class="">
      <ul>
        <li @click="resetCamera"><button>重設視點</button></li>
        <li @click="patrolHandler"><button>巡邏</button></li>
        <li>經度 : {{ cesiumMenuData.longitude }}</li>
        <li>緯度 : {{ cesiumMenuData.latitude }}</li>
        <li>高度 : {{ cesiumMenuData.height }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal.vue"
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex"
import {
  cesiumMenuData,
  initialCesium,
  patrolHandler,
  resetCamera,
  addRectangleEntity_EXAMPLE,
  addCircleEntity_EXAMPLE,
  addEllipsoidEntity_EXAMPLE,
  addPolylineEntity_EXAMPLE
} from '@/assets/javascript/cesiumUtils';
import { settings } from "@/assets/javascript/cesiumSettings"

const store = useStore();
// const placeholder = "請選擇"; //computed(() => store.getters.CURRENT_MODEL);
const allModel = store.getters.ALL_MODEL;
const leftAsideOptions = ref([]);
const modalStatus = computed(() => store.getters.MODAL_STATUS);
const currentModelSet = computed(() => store.getters.CURRENT_MODEL_SET);
const modalArray = settings.model.ModalArray;
const isDisablePrveModel = computed(() => store.getters.MODEL_BREADCRUMB.length === 1)

onMounted(async () => {
  await initialCesium();
  // await fetchModelList();
  await addRectangleEntity_EXAMPLE();
  await addCircleEntity_EXAMPLE();
  await addEllipsoidEntity_EXAMPLE();
  await addPolylineEntity_EXAMPLE();
});

// function fetchModelList() {
//   leftAsideOptions.value.push({ label: allModel });
//   modalArray[currentModelSet.value].forEach(({ label, file, set }) => {
//     leftAsideOptions.value.push({
//       label: label,
//       file: file,
//       set: set
//     })
//   })
// }

function backTopPreviousModel() {
  const previousLabel = store.getters.HEADER_TITLE;
  const MODEL_BREADCRUMB = store.getters.MODEL_BREADCRUMB;
  const previousModel = MODEL_BREADCRUMB.length === 1 ? "initial" : MODEL_BREADCRUMB.pop();
  const currentModel = previousModel === "initial" ? previousModel : ""
  store.commit("SET_HEADER_TITLE", previousLabel);
  store.commit("SET_CURRENT_MODEL_SET", previousModel);
  store.commit("SET_CURRENT_MODEL", currentModel);
}

// function switchModel(t) {
//   const breadCrumb = store.getters.MODEL_BREADCRUMB;
//   if (t.value === allModel) {
//     store.commit("SET_CURRENT_MODEL", allModel);
//   } else {
//     breadCrumb.forEach(prop => {
//       if (modalArray.hasOwnProperty(prop)) {
//         const currentModel = settings.model.ModalArray.filter(({ label }) => label === t.value)[0];
//         store.commit("SET_CURRENT_MODEL", currentModel.label);
//       } else {
//         console.log(prop);
//       }
//     })
//   }
// }

function initialModel() {
  store.commit("SET_HEADER_TITLE", "DEMO");
  store.commit("SET_CURRENT_MODEL_SET", "initial");
  store.commit("SET_CURRENT_MODEL", "initial");
}

</script>

<style lang="scss" scoped>
#cesium {
  height: 100%;
  overflow: hidden;
}

// ceiusm view
::v-deep#viewerContainer {
  height: 100%;

  * {
    width: 100%;
    height: 100%;
  }
}

.aside {
  width: 25em;
  height: 3em;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.5em;

  button {
    height: 2.25rem;
    color: rgb(var(--CYAN));
    padding: 0.5em;
    background-color: rgba(var(--BLACK), 0.5);
    border: 2px solid rgb(var(--CYAN));
    border-radius: 0.25em;
  }
}

#leftAside {
  top: 0;
  left: 0;

  button {
    margin-right: 1em;
  }
}

#rightAside {
  top: 0;
  right: 0;
  justify-content: flex-end;

  button {
    margin-left: 1em;
  }
}



#menuContainer {
  position: absolute;
  width: 15em;
  height: 0;
  z-index: 10;
  font-size: 1rem;
  background-color: rgb(var(--WHITE));
  border: 5px solid red;
  animation-direction: normal;
  animation-name: showMenu;
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
}

@keyframes showMenu {
  0% {
    height: 0;
  }

  100% {
    height: 20em;
  }
}

#modalContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<style>
div.el-popper {
  width: 25rem !important;
}

.el-select-dropdown__item {
  width: calc(25rem - 2px);
}
</style>