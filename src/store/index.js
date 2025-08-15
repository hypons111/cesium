import { createStore } from 'vuex'

export default createStore({
  state: {
    HEADER_TITLE: "DEMO", // project 名稱
    CURRENT_SECTION: "cesium", // 現在所在的模組
    CURRENT_MODEL: "",
    MODEL_BREADCRUMB: ["initial"],
    MODAL_STATUS: {
      IS_SHOW : false,
      CONTENTS : {}
    }
  },
  getters: {
    HEADER_TITLE: state => state.HEADER_TITLE,
    CURRENT_SECTION: state => state.CURRENT_SECTION,
    CURRENT_MODEL: state => state.CURRENT_MODEL,
    MODEL_BREADCRUMB: state => state.MODEL_BREADCRUMB,
    MODAL_STATUS: state => state.MODAL_STATUS
  },
  mutations: {
    SET_HEADER_TITLE(state, payload) {
      state.HEADER_TITLE = payload;
    },
    SET_CURRENT_SECTION(state, payload) {
      state.CURRENT_SECTION = payload;
    },
    SET_CURRENT_MODEL(state, payload) {
      state.CURRENT_MODEL = payload;
    },
    SET_MODEL_BREADCRUMB(state, payload) {
      state.MODEL_BREADCRUMB = payload;
    },
    PUSH_MODEL_BREADCRUMB(state, element) {
      state.MODEL_BREADCRUMB.push(element);
    },
    SET_MODAL_STATUS(state, payload) {
      state.MODAL_STATUS = payload;
    }
  },
  actions: {},
  modules: {}
})
