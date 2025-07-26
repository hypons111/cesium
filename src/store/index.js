import { createStore } from 'vuex'

export default createStore({
  state: {
    HEADER_TITLE: "DEMO",
    CURRENT_SECTION: "section1",
    CURRENT_MAIN_COMPONENT: "section1",
    ALL_MODEL: "ALL",
    CURRENT_MODEL: "initial",
    CURRENT_MODEL_SET: "initial",
    MODEL_BREADCRUMB: ["initial"],
    MODAL_STATUS: {
      IS_SHOW : false,
      CONTENTS : {}
    }
  },
  getters: {
    HEADER_TITLE: state => state.HEADER_TITLE,
    CURRENT_SECTION: state => state.CURRENT_SECTION,
    CURRENT_MAIN_COMPONENT: state => state.CURRENT_MAIN_COMPONENT,
    ALL_MODEL: state => state.ALL_MODEL,
    CURRENT_MODEL: state => state.CURRENT_MODEL,
    CURRENT_MODEL_SET: state => state.CURRENT_MODEL_SET,
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
    SET_CURRENT_MAIN_COMPONENT(state, payload) {
      state.CURRENT_MAIN_COMPONENT = payload;
    },
    SET_CURRENT_MODEL(state, payload) {
      state.CURRENT_MODEL = payload;
    },
    SET_CURRENT_MODEL_SET(state, payload) {
      state.CURRENT_MODEL_SET = payload;
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
