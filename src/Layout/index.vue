<template>
  <div class="app-wrapper">
    <!-- <navbar /> -->
    <app-main />
    
    <!-- <div class="top_maskLayer"></div> -->
    <!-- <div class="decorative_line"></div> -->
  </div>
</template>

<script>
import AppMain from "./components/AppMain.vue";
// import Navbar from "./components/Navbar.vue";
export default {
  name: "Layout",
  components: {
    AppMain,
    // Navbar,
  },
  computed: {
    
  },
  methods: {
 
  },
};
</script>

<style lang="scss" scoped>

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
}
// .decorative_line {
//   position: absolute;
//   pointer-events: none;
//   top: 88px;
//   left: 0;
//   width: 100%;
//   height: 992px;
//   z-index: 9;
//   // background: url(../assets/images/decorative_line.png) no-repeat;
//   background-size: 100% 100%;
// }

// .top_maskLayer {
//   position: absolute;
//   pointer-events: none;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 413px;
//   // background: linear-gradient(180deg, #53BFFF 0%, rgba(97, 226, 255, 0) 100%);
//   opacity: 0.37;
//   filter: blur(50px);
// }
</style>
