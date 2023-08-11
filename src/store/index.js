/*
 * @Description:
 * @Author: jk
 * @Date: 2021-12-06 11:09:48
 * @LastEditTime: 2021-12-13 10:18:51
 * @LastEditors: jk
 * @Reference:
 * @FilePath: \qifu-tunnel-phase-ii\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import common from './modules/common'
import nav from './modules/nav'
import webgl from './modules/webgl'
import device from './modules/device'

// import popup from './modules/popup'
// import user from './modules/user'
// import tagsView from './modules/tagsView'
// import permission from './modules/permission'
// import settings from './modules/settings'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    nav,
    webgl,
    common,
    device
  },
  getters,
  plugins: [
    // 默认储存在localstorage
    createPersistedState({
      // 本地储存名
      key: 'ceshivuex',
      // 指定模块
      paths: ['nav','device']
    })
  ],
})

export default store
