<template>
  <div id="Tree" class="">

    <div id="treeHeaderContainer">
      <div>
        <p id="currentTree">{{ TreeTitle }}</p>
      </div>

      <div id="treeTabGroup">
        <button @click="switchTree('device')"><font-awesome-icon :icon="['fas', 'door-closed']" />設備清單</button>
        <button @click="switchTree('camera')"><font-awesome-icon :icon="['fas', 'door-closed']" />視角清單</button>
      </div>
    </div>

    <div id="treeContainer">
      <el-tree :data="tagData" default-expand-all :expand-on-click-node="false" :render-content="renderTree" />
    </div>

   <el-dialog
    v-model="dialogVisible"
    title="新增 Tag"
    width="300"
    :before-close="handleClose"
  >
    <el-form :model="dialogForm" ref="dialogRuleFormRef" label-width="auto">

      <el-form-item class="hide" label="parentId" :prop="'parentId'">
        <el-input v-model="dialogForm.parentId"/>
      </el-form-item>

      <el-form-item label="名稱" :prop="'label'">
        <el-input v-model="dialogForm.label" placeholder="請輸入 Tag 名稱" />
      </el-form-item>
      
      <el-form-item label="樣式" :prop="'billboard'">
        <el-select v-model="dialogForm.billboard" placeholder="請選擇 Tag 樣式">
          <el-option
            v-for="billboard in billboardOptions"
            :key="billboard.value"
            :label="billboard.label"
            :value="billboard.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="經度" :prop="'x'">
        <el-input v-model="dialogForm.x" placeholder="請輸入 Tag 經度"/>
      </el-form-item>

      <el-form-item label="緯度" :prop="'y'">
        <el-input v-model="dialogForm.y" placeholder="請輸入 Tag 緯度"/>
      </el-form-item>

      <el-form-item label="高度" :prop="'z'">
        <el-input v-model="dialogForm.z" placeholder="請輸入 Tag 高度"/>
      </el-form-item>

      <el-form-item label="大小" :prop="'s'">
        <el-input v-model="dialogForm.s" placeholder="請輸入 Tag 大小"/>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="tagDialogHandler('close')">Cancel</el-button>
        <el-button type="primary" @click="tagDialogHandler('append')">
          Confirm
        </el-button>
      </div>
    </template>

  </el-dialog>

  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import 'element-plus/dist/index.css';
import { addTagEntity, removeTagEntity, flyCamera } from '@/assets/javascript/cesiumUtils';
import axios from "axios";

/* 列表名稱 */
const TreeTitle = ref("設備清單");
/* 列表資料 */
const tagData = ref([]);
/* 查詢關鍵字 */
const keyword = ref('');
/* el-tree 新增的節點起始 id */
let id = 1000;
let treeNodeLevel = 0
/* Tag icon 選單 */
const billboardOptions = [
  {
    value: 'GREEN_TAG',
    label: 'GREEN_TAG',
  },
  {
    value: 'RED_TAG',
    label: 'RED_TAG',
  },
  {
    value: 'SUCCESS_TAG',
    label: 'SUCCESS_TAG',
  },
  {
    value: 'WARNNING_TAG',
    label: 'WARNNING_TAG',
  },
]

// 產生 tree
function renderTree(h, { node, data }) {
  node.status = data.status;
  return h('div', { class: 'custom-tree-node' },
    h('span', null, node.label),
    h(
      'span',
      { class: 'custom-tree-row' },
      h('a', { id: data.id, class: `zoom zoom_${data.billboard}`, onClick: () => onClickZoom(data) }, ""),
      h('a', { id: data.id, class: `eye${data.status}`, onClick: () => onClickEye(data, node) }, ""),
      h('a', { class: `plus plus_${data.type}`, onClick: () => tagDialogHandler("open", data)}, '+'), // 增加節點
      h('a', { class: `minus minus_${data.type}`, onClick: () => remove(node, data) }, '-')  // 移除節點
    )
  )
}

/* 切換不同的樹狀圖 */
function switchTree(tree) {
  const treeTypes = {
    device: "設備清單",
    camera: "視角清單"
  }
  TreeTitle.value = treeTypes[tree];
  axios
    .get(`./json/fake_${tree}.json`)
    .then(response => {
      const data = response.data.data;
      tagData.value = data;
      removeTagEntity();
      addTagHandler(data);
    })
    .catch(error => {
      console.error("[ERROR] :", error);
    });
}

/* 找出要顯示的 tag */
function addTagHandler(data) {
  data.forEach(tag => {
    if (tag.status !== 0) {
      if (tag.billboard) {
        addTagEntity(tag);
      }
      if (tag.children) {
        addTagHandler(tag.children)
      }
    }
  })
}

function onClickZoom(nodeData) {
  const cameraData = {
    x: nodeData.x,
    y: nodeData.y,
    z: 300,
    h: 0,
    p: -1.5,
    r: 0,
  }
  flyCamera(cameraData);
}

// 點擊眼睛 icon
async function onClickEye(nodeData, node) {
  /* 清除全部 tag */
  removeTagEntity();

  /* 取得被點擊 node 的新 status */
  const newStatus = nodeData.status === 0 ? 2 : 0;
  node.data.status = newStatus;

  /* 改變被點擊的 node 的 children 的 status */
  const updateChildrenStatus = node => {
    if (node.childNodes) {
      node.childNodes.forEach(childNode => {
        childNode.data.status = newStatus;
        updateChildrenStatus(childNode);
      })
    }
  }

  /* 改變被點擊的 node 的 parent 的 status*/
  const updatePerantStatus = node => {
    if (node.parent) {
      const parentNode = node.parent;
      let counter = 0;
      parentNode.childNodes.forEach(children => {
        if (children.status === 2) {
          counter += 1;
        }
        // else if (children.status === 1){
        //   counter -= 1;
        // }
      })
      switch (counter) {
        case parentNode.childNodes.length:
          parentNode.data.status = 2;
          break;
        case 0:
          parentNode.data.status = 0;
          break;
        default:
          parentNode.data.status = 1;
          break;
      }
      /* 等待 child node 的 status 準備好才更新 parent node 的 status */
      setTimeout(() => {
        updatePerantStatus(parentNode);
      }, 0)
    }
  }

  /* 不要刪除 await */
  await updateChildrenStatus(node);
  await updatePerantStatus(node);
  await addTagHandler(tagData.value);
}

// 增加 tree 節點
// 參考 renderContent() 
const dialogRuleFormRef = ref();
const dialogForm = reactive({
  id: "18",
  parentId: "",
  label: "",
  billboard: "",
  x: "", // 121.53399553220129
  y: "", // 25.292098729202575
  z: "1",
  s: "0.5"
});

const dialogVisible = ref(false)

function tagDialogHandler(option, data=null) {
  switch(option) {
    case "open":
      dialogForm.parentId = data.id;
      dialogVisible.value = true;
      break
    case "append":
      append()
      tagDialogHandler("close")
      break
    case "close":
      dialogRuleFormRef.value.resetFields();
      dialogVisible.value = false;
      break
  }
}

function append() {
  const newTag = {
    "id": 18,
    "type": "entity",
    "label": dialogForm.label,
    "billboard": dialogForm.billboard,
    "x": Number(dialogForm.x),
    "y": Number(dialogForm.y),
    "z": Number(dialogForm.z),
    "s": Number(dialogForm.s),
    "status": 2
  }
  const parent = tagData.value.find(({id}) => id === dialogForm.parentId)
  parent.children.push(newTag)
  tagData.value = [...tagData.value]
  addTagEntity(newTag)
}

// 移除 tree 節點
// 參考 renderContent() 
function remove(node, data) {
  alert('需要接 end point')
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  tagData.value = [...tagData.value]
}

onMounted(() => {
  switchTree("device");
})

onUnmounted(() => {
  removeTagEntity() // 離開 Tag 頁面時清除全部 tag entity
})
</script>

<style>
#Tree {
  width: 20em;
  height: calc(100vh - 6em - 2em);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(var(--BLACK), 0.75);

  #treeHeaderContainer {
    height: 5em;
    color: white;
    border: 2px solid rgb(var(--CYAN));

    #treeTabGroup {
      border: 1px solid red;

      button {
        padding: 0.5em;
        background-color: bisque;
      }
    }
  }

  #treeContainer {
    flex-grow: 1;
    padding: 1em;

    .el-tree {
      background: none;
      color: rgb(var(--WHITE));

      .custom-tree-node {
        height: 2em;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        /* border: 1px solid red; */
      }
    }

    .custom-tree-row {
      flex-grow: 1;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      color: rgb(var(--CYAN));
      /* border: 1px solid lime; */

      &>* {
        margin-left: 0.5em;
      }

      .zoom {
        width: 1em;
        height: 100%;
        background-image: url("@/assets/image/magnifying-glass-solid.svg");
        background-repeat: no-repeat;
        background-position: center 60%;
      }

      .zoom_undefined {
        display: none;
      }
      .plus_entity {
        display: none;
      }
      .minus_category {
        display: none;
      }

      .eye0 {
        width: 1em;
        height: 100%;
        background-image: url("@/assets/image/eye0.svg");
        background-repeat: no-repeat;
        background-position: center 60%;
      }

      .eye1 {
        width: 1em;
        height: 100%;
        background-image: url("@/assets/image/eye1.svg");
        background-repeat: no-repeat;
        background-position: center 60%;
      }

      .eye2 {
        width: 1em;
        height: 100%;
        background-image: url("@/assets/image/eye2.svg");
        background-repeat: no-repeat;
        background-position: center 60%;
      }

      .plus {
        line-height: 2em;
        /* border: 1px solid green; */
      }

      .minus {
        line-height: 1.9em;
      }


    }


  }

  #treeFooterContainer {
    height: 3em;
    color: white;
    border-top: 2px solid rgb(var(--CYAN));
  }

  .hide {
    display: none;
  }
}
</style>
