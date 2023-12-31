import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import router from "./router";
import './styles/index.scss';
import store from './store'


Vue.use(ElementUI, {
  size: 'medium' // set element-ui default size
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
