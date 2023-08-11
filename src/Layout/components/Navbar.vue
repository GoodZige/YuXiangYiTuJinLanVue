<template>
  <div class="navbar">
    <div class="box">
      <div class="tab_box">
        <div class="left_tab_item after_box" :class="currentItemIndex === 1 ? 'active_bgImg_left' : ''" @click="handleSwitch(1)">
          <div class="tab_value">
            <img src="../../assets/images/camera_icon.png" alt="" class="icon_sty">
            <span>入口监控</span>
          </div>
        </div>
        <div class="left_tab_item" :class="currentItemIndex === 2 ? 'active_bgImg_left' : ''" @click="handleSwitch(2)">
          <div class="tab_value">
            <img src="../../assets/images/hologram_icon.png" alt="" class="hologram_icon">
            <span>全息感知</span>
          </div>
        </div>
        <div class="title">
          <img src="../../assets/images/智慧服务区孪生平台.png" alt="">
        </div>
        <div class="right_tab_item after_box" :class="currentItemIndex === 3 ? 'active_bgImg_right' : ''" @click="handleSwitch(3)">
          <div class="tab_value">
            <img src="../../assets/images/tab_event_icon.png" alt="" class="icon_sty">
            <span>事件管理</span>
          </div>
        </div>
        <div class="right_tab_item" :class="currentItemIndex === 4 ? 'active_bgImg_right' : ''" @click="handleSwitch(4)">
          <div class="tab_value">
            <img src="../../assets/images/analysis_icon.png" alt="" class="icon_sty">
            <span>研判分析</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:'Navbar',
  data(){
    return {
      currentItemIndex: 1
    }
  },
  watch: {
      $route: {
        handler: function (route) {
          switch (route.path) {
            case '/entranceMonitoring':
              this.currentItemIndex = 1
              break;
            case '/holographicPerception':
              this.currentItemIndex = 2
              break;
            case '/eventManagement':
              this.currentItemIndex = 3
              break;
            case '/judgmentAnalysis':
              this.currentItemIndex = 4
              break;
            default:
              break;
          }
        },
        immediate: true,
      },
  },
  mounted(){
  },
  methods:{
    handleSwitch(val){
       /**
       *  1 = 入口监控
       *  2 = 全息感知
       *  3 = 事件管理
       *  4 = 判研分析
       */
      const routes = {
        1: '/entranceMonitoring',
        2: '/holographicPerception',
        3: '/eventManagement',
        4: '/judgmentAnalysis'
      };
      if(val){
        this.currentItemIndex = val
        this.$router.push(routes[val]);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.navbar{
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 80px; 
  .box{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/bg-title.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .tab_box{
        display: flex;
        justify-content: center;
        color: #fff;
        padding-top: 15px;
        font-family: "PangMenZhengDao";
        .title{
          padding: 0px 20px 0 20px;
          img{
            width: 392px;
            height: 45px;
          }
        }
        .after_box{
          margin-right: -30px;
        }
        .left_tab_item {
          width: 233px;
          height: 50px;
          font-size: 26px;
          line-height: 50px;
          margin-top: 18px;
          text-align: center;
          cursor: pointer;
          background: url('../../assets/images/rectangle_one.png') no-repeat;
          background-size: 100% 100%;
          clip-path: polygon(84% 5px, 100% 33px, 96% 51px, 27% 45px, 0 0);
          .tab_value{
            margin-left: 15px;
            transform: rotate(3deg);
            .icon_sty{
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
            .hologram_icon{
              width: 30px;
              height: 30px;
              margin-right: 5px;
              vertical-align: sub;
            }
          }
        }
        .right_tab_item{
          width: 233px;
          height: 50px;
          font-size: 26px;
          line-height: 50px;
          margin-top: 24px;
          cursor: pointer;
          background: url('../../assets/images/rectangle_two.png') no-repeat;
          background-size: 100% 100%;
          clip-path: polygon(100% 0px, 77% 38px, 3% 50px, 0px 32px, 17% 5px);
          .tab_value{
            margin-left: 26px;
            transform: rotate(-4deg);
            .icon_sty{
              width: 30px;
              height: 30px;
              margin-right: 5px;
              vertical-align: sub;
            }
          }
        }
        .active_bgImg_left{
          background: url('../../assets/images/tab_highlight_bg.png') no-repeat;
          background-size: 100% 100%;
        }
        .active_bgImg_right{
          background: url('../../assets/images/tab_highlight_bg_right.png') no-repeat;
          background-size: 100% 100%;
        }
      }

  }

}
img{
  width: 100%;
  height: 100%;
}
</style>
