<template>
  <div class="carBoxStyle">
    <div :class="`carStyle ${carMap[carInfo.type]}${isTop ? '' : '-down'}`"></div>
    <!-- 事件 -->
    <div v-if="carInfo.sj" class="plEvent">
      <div class="earlyWarning">{{ eventTypeMap[carInfo.sj] }}</div>
      <div class="plBg">{{ carInfo.cp || '未识别' }}</div>
      <!-- 事件盒子 -->
      <div v-if="carInfo.sj === 6" :class="`event-box-${isTop ? 'top' : 'down'}`">
        <div :class="`line-${isTop ? 'top' : 'down'}`"></div>
        <div class="box-one">
          <img :src="carInfo.chetouPic" alt="">
          <img :src="carInfo.paizhaoPic" alt="">
          <div>{{ carInfo.cp }}</div>
          <div>{{ carInfo.eventStakeNum }}</div>
        </div>
        <!-- <div v-else-if="carInfo.sj === 16" class="box-two">
          <img :src="carInfo.chetouPic" alt="">
          <img :src="carInfo.eventPic" alt="">
          <img :src="carInfo.paizhaoPic" alt="">
          <div>{{ carInfo.cp }}</div>
          <div>T20+685</div>
        </div> -->
      </div>
    </div>
    <!-- 两客一危-->
    <div v-else-if="carInfo.type == 3 || carInfo.type == 7 || carInfo.type == 8" class="plClass">{{ carInfo.cp || '未识别' }}
    </div>
    <!-- 普通 -->
    <!-- <div v-else class="plHover">
      <div class="plBg" v-if="activeCar == carInfo.id">{{carInfo.cp || '未识别'}}</div>
      <div class="positionIcon" @mouseenter="mouseenterFun(carInfo.id)" @mouseleave="mouseleaveFun"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      carMap: {
        1: 'xiaoke',
        2: 'dahuo',
        3: 'daba',
        // 4: 'man',
        5: 'zixingche',
        6: 'moto',
        7: 'zhongba',
        8: 'weihua',
        // 9: 'yisawu',
        10: 'xiaohuo',
        11: 'zhonghuo',
        15: 'xiaoba',
      },
      eventTypeMap: {
        6: '超速',
        16: '变道'
      },
    }
  },
  props: {
    carInfo: {
      default: null
    },
    isTop: {
      default: true
    },
  },
  mounted() {

  },
  destroyed () {
    console.log('destroyed');
  },
}
</script>

<style lang="scss" scoped>
.event-box-top {
  position: relative;
  top: -237px;
  left: 82px;
  z-index: 99;

  .line-top {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 2px;
    height: 205px;
    background: url(~@/assets/images/事件上杆.png) no-repeat;
    background-size: 100% 100%;
  }

  .box-one {
    position: absolute;
    left: -65px;
    top: -152px;
    width: 139px;
    height: 151px;
    background: url(~@/assets/images/事件小板.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;

    img:nth-of-type(1) {
      position: absolute;
      left: 19px;
      top: 32px;
      width: 98px;
      height: 98px;
    }

    img:nth-of-type(2) {
      position: absolute;
      left: 26px;
      top: 106px;
      width: 84px;
      height: 24px;
    }

    div:nth-of-type(1) {
      position: absolute;
      left: 39px;
      top: 32px;
      width: 78px;
      height: 17px;
      background: url(~@/assets/images/车牌底.png) no-repeat;
      background-size: 100% 100%;
      font-size: 12px;
      text-indent: 14px;
    }
    div:nth-of-type(2) {
      font-size: 14px;
      margin-top: 10px;
    }
  }

  .box-two {
    position: absolute;
    left: -157px;
    top: -152px;
    width: 319px;
    height: 151px;
    background: url(~@/assets/images/事件大板.png) no-repeat;
    background-size: 100% 100%;

    img:nth-of-type(1) {
      position: absolute;
      left: 14px;
      top: 29px;
      width: 111px;
      height: 113px;
    }

    img:nth-of-type(2) {
      position: absolute;
      left: 130px;
      top: 29px;
      width: 171px;
      height: 113px;
    }

    img:nth-of-type(3) {
      position: absolute;
      left: 24px;
      top: 115px;
      width: 90px;
      height: 26px;
    }

    div:nth-of-type(1) {
      position: absolute;
      left: 46px;
      top: 30px;
      width: 78px;
      height: 17px;
      background: url(~@/assets/images/车牌底.png) no-repeat;
      background-size: 100% 100%;
      font-size: 12px;
      text-indent: 14px;
    }
    div:nth-of-type(2) {
      position: absolute;
      left: 20px;
      top: 4px;
      font-size: 14px;
    }
  }
}

.event-box-down {
  position: relative;
  top: 38px;
  left: 0;
  z-index: 99;
  transform:translate(50%, 0%);

  .line-down {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 2px;
    height: 280px;
    background: url(~@/assets/images/事件下杆.png) no-repeat;
    background-size: 100% 100%;
  }

  .box-one {
    position: absolute;
    left: -65px;
    top: 278px;
    width: 139px;
    height: 151px;
    background: url(~@/assets/images/事件小板.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;

    img:nth-of-type(1) {
      position: absolute;
      left: 19px;
      top: 32px;
      width: 98px;
      height: 98px;
    }

    img:nth-of-type(2) {
      position: absolute;
      left: 26px;
      top: 106px;
      width: 84px;
      height: 24px;
    }

    div:nth-of-type(1) {
      position: absolute;
      left: 39px;
      top: 32px;
      width: 78px;
      height: 17px;
      background: url(~@/assets/images/车牌底.png) no-repeat;
      background-size: 100% 100%;
      font-size: 12px;
      text-indent: 14px;
    }
    div:nth-of-type(2) {
      font-size: 14px;
      margin-top: 10px;
    }
  }

  .box-two {
    position: absolute;
    left: -157px;
    top: 194px;
    width: 319px;
    height: 151px;
    background: url(~@/assets/images/事件大板.png) no-repeat;
    background-size: 100% 100%;

    img:nth-of-type(1) {
      position: absolute;
      left: 14px;
      top: 29px;
      width: 111px;
      height: 113px;
    }

    img:nth-of-type(2) {
      position: absolute;
      left: 130px;
      top: 29px;
      width: 171px;
      height: 113px;
    }

    img:nth-of-type(3) {
      position: absolute;
      left: 24px;
      top: 115px;
      width: 90px;
      height: 26px;
    }

    div:nth-of-type(1) {
      position: absolute;
      left: 46px;
      top: 30px;
      width: 78px;
      height: 17px;
      background: url(~@/assets/images/车牌底.png) no-repeat;
      background-size: 100% 100%;
      font-size: 12px;
      text-indent: 14px;
    }
    div:nth-of-type(2) {
      position: absolute;
      left: 20px;
      top: 4px;
      font-size: 14px;
    }
  }
}

.carStyle {
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.xiaoke {
  background: url(~@/assets/images/小客车.png) no-repeat;
  background-size: 100% 100%;
}

.dahuo {
  background: url(~@/assets/images/大货车.png) no-repeat;
  background-size: 100% 100%;
  z-index: 99999;
}

.daba {
  background: url(~@/assets/images/大巴车.png) no-repeat;
  background-size: 100% 100%;
}

// .man {
//   background: url(~@/assets/images/行人.png) no-repeat;
//   background-size: 100% 100%;
// }
.zixingche {
  background: url(~@/assets/images/自行车.png) no-repeat;
  background-size: 100% 100%;
}

.moto {
  background: url(~@/assets/images/摩托车.png) no-repeat;
  background-size: 100% 100%;
}

.zhongba {
  background: url(~@/assets/images/中巴车.png) no-repeat;
  background-size: 100% 100%;
}

.weihua {
  background: url(~@/assets/images/危化品车.png) no-repeat;
  background-size: 100% 100%;
}

.xiaohuo {
  background: url(~@/assets/images/小货车.png) no-repeat;
  background-size: 100% 100%;
}

.zhonghuo {
  background: url(~@/assets/images/中货车.png) no-repeat;
  background-size: 100% 100%;
}

.jika {
  background: url(~@/assets/images/jika.png) no-repeat;
  background-size: 100% 100%;
}

.xiaoba {
  background: url(~@/assets/images/小巴车.png) no-repeat;
  background-size: 100% 100%;
}

.xiaoke-down {
  background: url(~@/assets/images/小客车_下.png) no-repeat;
  background-size: 100% 100%;
}

.dahuo-down {
  background: url(~@/assets/images/大货车_下.png) no-repeat;
  background-size: 100% 100%;
  z-index: 99999;
}

.daba-down {
  background: url(~@/assets/images/大巴车_下.png) no-repeat;
  background-size: 100% 100%;
}

.zixingche-down {
  background: url(~@/assets/images/自行车_下.png) no-repeat;
  background-size: 100% 100%;
}

.moto-down {
  background: url(~@/assets/images/摩托车_下.png) no-repeat;
  background-size: 100% 100%;
}

.zhongba-down {
  background: url(~@/assets/images/中巴车_下.png) no-repeat;
  background-size: 100% 100%;
}

.weihua-down {
  background: url(~@/assets/images/危化品车_下.png) no-repeat;
  background-size: 100% 100%;
}

.xiaohuo-down {
  background: url(~@/assets/images/小货车_下.png) no-repeat;
  background-size: 100% 100%;
}

.zhonghuo-down {
  background: url(~@/assets/images/中货车_下.png) no-repeat;
  background-size: 100% 100%;
}

// .jika-down {
//   background: url(~@/assets/images/jika_下.png) no-repeat;
//   background-size: 100% 100%;
// }
.xiaoba-down {
  background: url(~@/assets/images/小巴车_下.png) no-repeat;
  background-size: 100% 100%;
}

.plEvent {
  position: absolute;
  left: 50%;
  top: -50px;
  z-index: 9;
  transform: translateX(-50%);

  .earlyWarning {
    width: 166px;
    height: 36px;
    /** 文本1 */
    font-size: 24px;
    font-weight: 500;
    line-height: 36px;
    color: rgba(255, 216, 0, 1);
    text-align: center;
    vertical-align: top;
    background: url(~@/assets/images/earlyWarning.png) no-repeat;
    background-size: 100% 100%;
  }
}

.plClass {
  position: absolute;
  left: 50%;
  top: -15px;
  z-index: 9;
  width: 70px;
  height: 33px;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  transform: translateX(-50%);
  background: url(~@/assets/images/eventBg.png) no-repeat;
  background-size: 100% 100%;
}

.plHover {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 126px;
  height: 50px;
  z-index: 19;
  font-size: 18px;
  text-align: center;

  .positionIcon {
    width: 14px;
    height: 14px;
    position: absolute;
    pointer-events: auto;
    cursor: pointer;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    background: url(~@/assets/images/positionIcon.png) no-repeat;
    background-size: 100% 100%;
  }
}

.plBg {
  position: absolute;
  z-index: 100;
  width: 70px;
  height: 33px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 22px;
  font-size: 12px;
  background: url(~@/assets/images/plBg.png) no-repeat;
  background-size: 100% 100%;
  text-align: center;
}

.carBoxStyle {
  position: absolute;
  pointer-events: none;
  width: 74px;
  height: 37px;
  transform: translate(-50%, -60%);
}
</style>