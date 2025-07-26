import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus'


// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

// 自定義css
import './assets/css/reset.css';
import './assets/css/globe.css';

createApp(App)
.use(store)
.use(router)
.use(ElementPlus)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
