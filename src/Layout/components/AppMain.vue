<!--
 * @Description:
 * @Author: jk
 * @Date: 2021-12-06 11:09:48
 * @LastEditTime: 2021-12-15 14:50:19
 * @LastEditors: jk
 * @Reference:
 * @FilePath: \qifu-tunnel-phase-ii\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
        <router-view />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>

export default {
  name: "AppMain",
  created() {

  },
  computed: {
  
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
