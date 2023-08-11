<template>
  <div class="container">
    1111111111111111
  </div>
</template>

<script>
import { displayH5sVideo } from "@/utils/icyH5stream.js"
import CarBox from './components/CarBox.vue';

const _ = require('lodash')

const ROAD_WIDTH = 3032;
const ROAD_HEIGHT = 23;

export default {
  name: 'home',
  components: {
    CarBox,
  },
  data() {
    return {
      dialogVisible: false,
      eventImg: require('@/assets/images/eventImg.jpg'),
      showImg: require('@/assets/images/显示按钮.png'),
      hideImg: require('@/assets/images/隐藏按钮.png'),
      deviceStatusList:{
        road: true,
        signal: true,
        wind: true,
        door: true,
        broadcast:true,
        board:true,
      },
      tempDeviceStatusList:{},
      jizhanList: ["1#k19+095", "2#k19+220", "3#k19+345", "4#k19+468", "5#k19+592", "6#k19+745", "7#k19+895", "8#k20+053", "9#k20+211", "10#k20+369", "11#k20+527", "12#k20+685"],
      vedioBoxs: ['h5sVideo0', 'h5sVideo1', 'h5sVideo2', 'h5sVideo3', 'h5sVideo4', 'h5sVideo5', 'h5sVideo6', 'h5sVideo7', 'h5sVideo8', 'h5sVideo9', 'h5sVideo10', 'h5sVideo11', 'h5sVideo12', 'h5sVideo13', 'h5sVideo14'],
      bottomVideoBoxs: ['h5sVideo0_2', 'h5sVideo1_2', 'h5sVideo2_2', 'h5sVideo3_2', 'h5sVideo4_2', 'h5sVideo5_2', 'h5sVideo6_2', 'h5sVideo7_2', 'h5sVideo8_2', 'h5sVideo9_2', 'h5sVideo10_2', 'h5sVideo11_2', 'h5sVideo12_2', 'h5sVideo13_2', 'h5sVideo14_2'],
      topStakes: ["往广州方向入口", "R19+095", "R19+220", "R19+345", "R19+468", "R19+592", "R19+745", "R19+895", "R20+053", "R20+211", "R20+369", "R20+527", "R20+685", "往广州方向出口"].reverse(),
      bottomStakes: ["往佛山方向入口", "T19+095", "T19+220", "T19+345", "T19+468", "T19+592", "T19+745", "T19+895", "T20+053", "T20+211", "T20+369", "T20+527", "T20+685", "往佛山方向出口"].reverse(),
      stakesX: [[565.7747747747748],
      [766.5495495495495],
      [976.4504504504504],
      [1186.3513513513512],
      [1396.2522522522522],
      [1642.6576576576576],
      [1889.063063063063],
      [2153.7207207207202],
      [2409.252252252252],
      [2673.90990990991],
      [2938.5675675675675],
      [3203.2252252252256]],
      cars: [],
      bottomCars: [],
      // trackWsUrl: 'ws://10.100.12.34:11200/event/',
      // websocketUrl: 'ws://10.100.12.34:11200/result/',
      trackWsUrl: 'ws://192.168.12.101:11200/event/',
      websocketUrl: 'ws://10.100.12.34:11200/tp/',
      socket: '',
      trackSocket: '',
      activeCar: '',
      topMap: {
        1: '70px',
        2: '110px',
        3: '150px',
      },
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
      //各个类型车长的一半
      carLengthMap: {
        1: 25,
        2: 98,
        3: 82,
        // 4: 'man',
        5: 8,
        6: 9,
        7: 53,
        8: 96,
        // 9: 'yisawu',
        10: 36,
        11: 57,
        15: 37,
      },
      y_limit: 100,
      carCNMap: {
        1: '小客车',
        2: '大货车',
        3: '大巴车',
        // 4: 'man',
        5: '自行车',
        6: '摩托车',
        7: '中巴车',
        8: '危化车',
        // 9: 'yisawu',
        10: '小货车',
        11: '中货车',
        15: '小巴车',
      },
      eventTypeMap: {
        6: '超速',
        16: '变道'
      },
      qbbInfo: {},
      tsyStakeTop: [
        'R20+500',
        'R20+200',
        'R19+900',
        'R19+600',
        'R19+300',
        'R19+000',
      ],
      tsyStakeBottom: [
        'T20+700',
        'T20+420',
        'T20+100',
        'T19+820',
        'T19+500',
        'T19+250',
      ],
      leftTopInfo: {},
      leftBottomInfo: {},
      chetouPic: require('@/assets/images/暂无数据_左.png'),
      eventPic: require('@/assets/images/暂无数据_左.png'),
      testTrackData: {
        "eventTableList": [{
          "carLicense": '暂无数据',
          "carType": 0,
          "chetouPic": require('@/assets/images/暂无数据_左.png'),
          "eventLocation": "事件位置",
          "eventPic": require('@/assets/images/暂无数据_左.png'),
          "eventType": 0,
          "paizhaoPic": '',
          "timestamp": 1689919198220
        }
        ]
      },
      deviceTopData: [
        {
          index: 1,
          type:'road',
          src: require('@/assets/images/board/arrow_group.png'),
          width: '26px',
          height: '46px',
          left: '558px',
          top: '230px'
        },
        {
          index: 2,
          type:'wind',
          src: require('@/assets/images/board/wind_right.png'),
          width: '40px',
          height: '45px',
          left: '915px',
          top: '230px'
        },
        {
          index: 3,
          type:'road',
          src: require('@/assets/images/board/arrow_group.png'),
          width: '26px',
          height: '46px',
          left: '1301px',
          top: '230px'
        },
        {
          index: 4,
          type:'wind',
          src: require('@/assets/images/board/wind_right.png'),
          width: '40px',
          height: '45px',
          left: '1832px',
          top: '230px'
        },
        {
          index: 5,
          type:'road',
          src: require('@/assets/images/board/arrow_group.png'),
          width: '26px',
          height: '46px',
          left: '2055px',
          top: '230px'
        },
        {
          index: 6,
          type:'wind',
          src: require('@/assets/images/board/wind_right.png'),
          width: '40px',
          height: '45px',
          left: '2528px',
          top: '230px'
        },
        {
          index: 7,
          type:'road',
          src: require('@/assets/images/board/arrow_group.png'),
          width: '26px',
          height: '46px',
          left: '2809px',
          top: '230px'
        },
        {
          index: 8,
          type:'wind',
          src: require('@/assets/images/board/wind_right.png'),
          width: '40px',
          height: '45px',
          left: '3133px',
          top: '230px'
        },
        {
          index: 9,
          type:'road',
          src: require('@/assets/images/board/arrow_group.png'),
          width: '26px',
          height: '46px',
          left: '3499px',
          top: '230px'
        },
      ],
      deviceBottomData: [
        {
          index: 1,
          type:'road',
          src: require('@/assets/images/board/arrow_group_right.png'),
          width: '26px',
          height: '46px',
          left: '305px',
          top: '0px',
        },
        {
          index: 2,
          type:'wind',
          src: require('@/assets/images/board/wind.png'),
          width: '40px',
          height: '45px',
          left: '678px',
          top: '0px'
        },
        {
          index: 3,
          type:'wind',
          src: require('@/assets/images/board/wind.png'),
          width: '40px',
          height: '45px',
          left: '1035px',
          top: '0px'
        },
        {
          index: 4,
          type:'road',
          src: require('@/assets/images/board/arrow_group_right.png'),
          width: '26px',
          height: '46px',
          left: '1237px',
          top: '0px'
        },
        {
          index: 5,
          type:'road',
          src: require('@/assets/images/board/arrow_group_right.png'),
          width: '26px',
          height: '46px',
          left: '1836px',
          top: '0px'
        },
        {
          index: 6,
          type:'road',
          src: require('@/assets/images/board/arrow_group_right.png'),
          width: '26px',
          height: '46px',
          left: '2685px',
          top: '0px'
        },
        {
          index: 7,
          type:'wind',
          src: require('@/assets/images/board/wind.png'),
          width: '40px',
          height: '45px',
          left: '2995px',
          top: '0px'
        },
        {
          index: 8,
          type:'road',
          src: require('@/assets/images/board/arrow_group2_right.png'),
          width: '26px',
          height: '46px',
          left: '3252px',
          top: '0px'
        },
      ]
    };
  },
  mounted() {
    this.getDeviceStatus()
    this.createSocket()
    this.createTrackSocket()
    // for (let index = 0; index < lineArray.length; index++) {
    //   let lonlat = lineArray[index];
    //   let lonlat2 = lineArray[index+1];
    //   if(lonlat2) {
    //     this.num += getDistance(lonlat[0],lonlat[1], lonlat2[0], lonlat2[1])
    //   }
    // }
    displayH5sVideo()
    // console.error(this.num)
  },
  methods: {
    mouseenterFun(id) {
      this.activeCar = id
    },
    mouseleaveFun() {
      this.activeCar = ''
    },
    getDeviceStatus(){
      this.deviceStatusList = this.$store.state.device.deviceStatusList
      this.tempDeviceStatusList = _.cloneDeep(this.deviceStatusList)
    },
    createTrackSocket() {
      this.trackSocket = new WebSocket(this.trackWsUrl + Date.now())
      this.trackSocket.onmessage = (msg) => {
        let socketData = JSON.parse(msg.data);
        // if(socketData.eventTableList.length!=0){
        //   this.testTrackData.eventTableList.push(...socketData.eventTableList)
        // }
        this.testTrackData = socketData
      }
    },
    createSocket() {
      this.socket = new WebSocket(this.websocketUrl + Date.now())
      // let carTrackArr = {}
      // setInterval(() => {
      // }, 10000);
      this.socket.onmessage = (msg) => {
        let socketData = JSON.parse(msg.data);
        let carTrafficList = socketData.carTrafficList
        let participantList = socketData.participantList

        // 分辨率总长：3233
        // 路径总长：1811.4
        // 比率：1:1.7848073313459203~1.785
        this.leftTopInfo = carTrafficList.carTrafficC
        this.leftBottomInfo = carTrafficList.carTrafficR
        this.qbbInfo = {
          qbb1: socketData.qbb1,
          qbb2: socketData.qbb2,
          qbb3: socketData.qbb3,
          qbb4: socketData.qbb4,
          tsy1: socketData.tsy1,
          tsy2: socketData.tsy2,
          tsy3: socketData.tsy3,
          tsy4: socketData.tsy4,
          tsy5: socketData.tsy5,
          tsy6: socketData.tsy6,
        }
        this.cars = participantList.participantR.map(item => {
          if (item.yCoordinate < 0 || item.yCoordinate > 1) {
            if (item.yCoordinate < 0) {
              item.yCoordinate = 0
            }else{
              item.yCoordinate = 1
            }
          }
          // if (item.eventType) {
          //   console.log('item', item);
          // }
          return {
            id: item.id,
            cp: item.picLicense,
            sj: item.eventType,
            eventStakeNum: item.eventStakeNum,
            paizhaoPic: item.paizhaoPic,
            chetouPic: item.chetouPic,
            eventPic: item.eventPic,
            type: item.carType,
            longRate: (item.xCoordinate * ROAD_WIDTH) + 368,
            widthRate: (item.yCoordinate - 0.5) * ROAD_HEIGHT,
            isPoint: false
          }
        })
        // this.cars = this.cars.map((car) => {
        //   car.isPoint = this.calcImpact(car)
        //   return car
        // })
        this.cars.sort((a, b) => {
          return a.widthRate - b.widthRate
        })
        this.bottomCars = participantList.participantC.map(item => {
          if (item.yCoordinate < 0 || item.yCoordinate > 1) {
            if (item.yCoordinate < 0) {
              item.yCoordinate = 0
            }else{
              item.yCoordinate = 1
            }
          }
          // if (item.eventType) {
          //   console.log('item', item);
          // }
          return {
            id: item.id,
            cp: item.picLicense,
            sj: item.eventType,
            eventStakeNum: item.eventStakeNum,
            paizhaoPic: item.paizhaoPic,
            chetouPic: item.chetouPic,
            eventPic: item.eventPic,
            type: item.carType,
            longRate: (item.xCoordinate * ROAD_WIDTH) + 368,
            widthRate: (item.yCoordinate + 0.5) * ROAD_HEIGHT,
            isPoint: false
          }
        })
        // this.bottomCars = this.bottomCars.map((car) => {
        //   car.isPoint = this.calcImpact(car)
        //   return car
        // })
        this.bottomCars.sort((a, b) => {
          return a.widthRate - b.widthRate
        })
      }
    },
    calcImpact(aCar) {
      let isPoint = false
      let len_a = this.carLengthMap[aCar.type]
      let x_a = aCar.longRate
      let y_a = aCar.widthRate
      for (let i = 0; i < this.cars.length; i++) {
        let bCar = this.cars[i]
        if (bCar.id != aCar.id && !bCar.isPoint) {
          let len_b = this.carLengthMap[bCar.type]
          let x_b = bCar.longRate
          let y_b = bCar.widthRate
          let x_impact = (Math.abs(x_a - x_b) - (len_a + len_b)) < 0 ? true : false
          let y_impact = (Math.abs(y_a - y_b) - this.y_limit) < 0 ? true : false
          isPoint = x_impact && y_impact
          if (isPoint) break
        }
      }
      return isPoint
    },
    showDevice(device){
      this.tempDeviceStatusList[device] = !this.tempDeviceStatusList[device]
    },
    commitDeviceStatus(){
      this.dialogVisible = false
      this.deviceStatusList = _.cloneDeep(this.tempDeviceStatusList)
      this.$store.commit('device/SET_DEVICE_STATUS_LIST',this.deviceStatusList)
    },
    cancelDeviceStatus(){
      console.log('关闭');
      this.dialogVisible = false
      this.tempDeviceStatusList = _.cloneDeep(this.deviceStatusList)
    },
  },
};
</script>

<style lang="scss" scoped>
.roadBox {
  position: relative;
  left: 71px;
  top: 0px;
  height: 1080px;
  width: calc(100% - 140px);
  overflow: hidden;

  li {
    display: inline-block;
    // border: 1px solid white;
    box-sizing: border-box;
    width: 220px;
    height: 124px;
    margin-right: 25px;
  }

  .topVideoBox {
    margin: 348px 0 0 97px;
  }

  .video-li {
    position: relative;
  }

  .video_stake_bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 136px;
    background: url(~@/assets/images/视频桩号.png) no-repeat;
    background-size: 100% 100%;
    padding: 0px 12px;
    font-size: 16px;
  }

  .bottomVideoBox {
    position: absolute;
    bottom: 222px;
    left: 209px;
  }
}

.signal {
  position: absolute;
  left: 0;
  top: 0;

  .signal-1 {
    position: absolute;
    left: 3785px;
    top: 480px;
    width: 27px;
    height: 106px;
  }

  .signal-2 {
    position: absolute;
    left: 24px;
    top: 577px;
    width: 27px;
    height: 106px;
  }
}

.right-video-box {
  position: absolute;
  left: 3579px;
  top: 141px;
}

.left-video-box {
  position: absolute;
  left: 71px;
  top: 631px;
}

.video-box {
  position: relative;
  width: 192px;
  height: 108px;
  margin-bottom: 10px;

  .video-title {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(23, 43, 51, 1);
    text-align: center;
  }
}

.h5video_ {
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: inline-block;
}

.container {
  width: 100%;
  height: 100vh;
  background: black;
  overflow-x: scroll;
}

.all-box {
  width: 100%;
  height: 1080px;
  position: absolute;
}

.road-bg {
  position: absolute;
  top: 484px;
  left: 0;
  width: 3700px;
  height: 125px;
  background: url(~@/assets/images/路.png) no-repeat;
  background-size: 100% 100%;

  .topRoadBox {
    position: absolute;
    width: 3700px;
    height: 53px;
    top: 27px;
    left: 0;
  }

  .bottomRoadBox {
    position: absolute;
    width: 3700px;
    height: 53px;
    bottom: -20px;
    left: 0;

  }
}

.qiaodong {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 3700px;
  height: 125px;
  background: url(~@/assets/images/qiaodong.png) no-repeat;
  background-size: 100% 100%;
}

.event-box-top {
  position: relative;
  top: -237px;
  left: 80px;
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

    img:nth-of-type(1) {
      position: absolute;
      left: 14px;
      top: 29px;
      width: 111px;
      height: 113px;
    }

    img:nth-of-type(2) {
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
  }
}

.event-box-down {
  position: relative;
  top: -100px;
  left: 600px;
  z-index: 99;

  .line-down {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 2px;
    height: 205px;
    background: url(~@/assets/images/事件下杆.png) no-repeat;
    background-size: 100% 100%;
  }

  .box-one {
    position: absolute;
    left: -65px;
    top: 194px;
    width: 139px;
    height: 151px;
    background: url(~@/assets/images/事件小板.png) no-repeat;
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

.left-top-box {
  position: absolute;
  width: 516px;
  height: 229px;
  background: url(~@/assets/images/实时车流信息.png) no-repeat;
  background-size: 100% 100%;
  font-family: "PangMenZhengDao-3";
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 25.44px;
  left: 0;
  top: 16px;

  .num {
    /** 文本1 */
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 25.44px;
    position: absolute;
    left: 189px;
    top: 69px;
  }

  .speed {
    /** 文本1 */
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 25.44px;
    position: absolute;
    left: 370px;
    top: 69px;

    span {
      /** 文本2 */
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      text-align: center;
      vertical-align: top;
    }
  }

  .whc {
    font-size: 20px;
    position: absolute;
    left: 128px;
    top: 149px;
  }

  .dhc {
    font-size: 20px;
    position: absolute;
    left: 296px;
    top: 149px;
  }

  .zhc {
    font-size: 20px;
    position: absolute;
    left: 128px;
    top: 186px;
  }

  .xhc {
    font-size: 20px;
    position: absolute;
    left: 296px;
    top: 186px;
  }

  .dkc {
    font-size: 20px;
    position: absolute;
    left: 464px;
    top: 149px;
  }

  .xkc {
    font-size: 20px;
    position: absolute;
    left: 464px;
    top: 186px;
  }
}

.right-bottom-box {
  position: absolute;
  width: 516px;
  height: 229px;
  background: url(~@/assets/images/实时车流信息.png) no-repeat;
  background-size: 100% 100%;
  font-family: "PangMenZhengDao-3";
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 25.44px;
  right: 0;
  bottom: 16px;

  .num {
    /** 文本1 */
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 25.44px;
    position: absolute;
    left: 189px;
    top: 69px;
  }

  .speed {
    /** 文本1 */
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 25.44px;
    position: absolute;
    left: 370px;
    top: 69px;

    span {
      /** 文本2 */
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      text-align: center;
      vertical-align: top;
    }
  }

  .whc {
    font-size: 20px;
    position: absolute;
    left: 128px;
    top: 149px;
  }

  .dhc {
    font-size: 20px;
    position: absolute;
    left: 296px;
    top: 149px;
  }

  .zhc {
    font-size: 20px;
    position: absolute;
    left: 128px;
    top: 192px;
  }

  .xhc {
    font-size: 20px;
    position: absolute;
    left: 296px;
    top: 192px;
  }

  .dkc {
    font-size: 20px;
    position: absolute;
    left: 464px;
    top: 149px;
  }

  .xkc {
    font-size: 20px;
    position: absolute;
    left: 464px;
    top: 192px;
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

.anyBox {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .top-box {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 513px;
  }

  .bottom-box {
    position: absolute;
    left: 0px;
    top: 599px;
    width: 100%;
    height: 513px;
  }

  .stake {
    /** 文本1 */
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    top: -5px;
    left: 0px;

    .stake_bg_top {
      position: absolute;
      background: url(~@/assets/images/设备桩号上.png) no-repeat;
      background-size: 100% 100%;
      padding: 0px 18px 3px 18px;
      transform: translate(50%, 0);
    }

    .stake_bg_bottom {
      position: absolute;
      background: url(~@/assets/images/设备桩号下.png) no-repeat;
      background-size: 100% 100%;
      padding: 3px 18px 0px 18px;
      transform: translate(50%, 0);
    }

    .gz {
      position: absolute;
      left: 0px;
      top: 482px;
      width: 3700px;
    }

    .fs {
      position: absolute;
      left: 0px;
      top: 9px;
      width: 3700px;
    }

    .top {
      position: absolute;
      left: 0px;
      top: 197px;

      .top1 {
        position: absolute;
        left: 427px;
      }

      .top2 {
        position: absolute;
        left: 785px;
      }

      .top3 {
        position: absolute;
        left: 1035px;
      }

      .top4 {
        position: absolute;
        left: 1168px;
      }

      .top5 {
        position: absolute;
        left: 1700px;
      }

      .top6 {
        position: absolute;
        left: 1922px;
      }

      .top7 {
        position: absolute;
        left: 2064px;
      }

      .top8 {
        position: absolute;
        left: 2399px;
      }

      .top9 {
        position: absolute;
        left: 2676px;
      }

      .top10 {
        position: absolute;
        left: 3002px;
      }

      .top11 {
        position: absolute;
        left: 3107px;
      }

      .top12 {
        position: absolute;
        left: 3366px;
      }
    }

    .bottom {
      position: absolute;
      left: 0px;
      top: 301px;

      .bottom1 {
        position: absolute;
        left: 162px;
      }

      .bottom2 {
        position: absolute;
        left: 372px;
      }

      .bottom3 {
        position: absolute;
        left: 548px;
      }

      .bottom4 {
        position: absolute;
        left: 902px;
      }

      .bottom5 {
        position: absolute;
        left: 1093px;
      }

      .bottom6 {
        position: absolute;
        left: 1393px;
      }

      .bottom7 {
        position: absolute;
        left: 1692px;
      }

      .bottom8 {
        position: absolute;
        left: 2369px;
      }

      .bottom9 {
        position: absolute;
        left: 2540px;
      }

      .bottom10 {
        position: absolute;
        left: 2861px;
      }

      .bottom11 {
        position: absolute;
        left: 3112px;
      }
    }
  }

  .board {
    $top1: 90px;
    $top2: 220px;

    /** 文本2 */
    font-family: '微软雅黑';
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 35px;
    text-align: center;
    vertical-align: top;
    color: rgba(255, 0, 0, 1);

    .board-top-1 {
      position: absolute;
      left: 1077px;
      top: $top2;
      width: 120px;
      height: 70px;
      border: 4px solid rgba(102, 102, 102, 1);
      background: #000;
    }

    .board-top-2 {
      position: absolute;
      left: 2108px;
      top: $top2;
      width: 120px;
      height: 70px;
      border: 4px solid rgba(102, 102, 102, 1);
      background: #000;
    }

    .board-top-3 {
      position: absolute;
      left: 3150px;
      top: $top2;
      width: 120px;
      height: 70px;
      border: 4px solid rgba(102, 102, 102, 1);
      background: #000;
    }

    $top3: 209px;

    .board-bottom-1 {
      position: absolute;
      left: 414px;
      top: $top3;
      width: 120px;
      height: 70px;
      border: 4px solid rgba(102, 102, 102, 1);
      background: #000;
    }

    .board-bottom-2 {
      position: absolute;
      left: 1434px;
      top: $top3;
      width: 120px;
      height: 70px;
      border: 4px solid rgba(102, 102, 102, 1);
      background: #000;
    }

    .board-bottom-3 {
      position: absolute;
      left: 2412px;
      top: $top3;
      width: 120px;
      height: 70px;
      border: 4px solid rgba(102, 102, 102, 1);
      background: #000;
    }
  }

  .yellow-horn-top {
    width: 239px;
    height: 215px;
    /** 文本1 */
    font-size: 19px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 52.13px;
    text-align: center;
    vertical-align: top;
    color: rgba(255, 255, 255, 1);
    background: url(~@/assets/images/board/黄语音上.png) no-repeat;
    background-size: 100% 100%;

    & span {
      position: relative;
      left: 17px;
      top: 12px;
    }
  }


  .yellow-horn-bottom {
    width: 239px;
    height: 215px;
    /** 文本1 */
    font-size: 19px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 52.13px;
    text-align: center;
    vertical-align: top;
    color: rgba(255, 255, 255, 1);
    background: url(~@/assets/images/board/黄语音下.png) no-repeat;
    background-size: 100% 100%;

    & span {
      position: relative;
      left: 20px;
      top: 155px;
    }
  }


  .horn-top {
    .stake-horn {
      position: absolute;
      left: 0px;
      top: 0px;
    }

    $top: 295px;

    &>div img {
      height: 215px;
    }

    .horn-top-1 {
      position: absolute;
      left: 1286px;
      top: $top;
    }

    .horn-top-2 {
      position: absolute;
      left: 2307px;
      top: $top;
    }

    .horn-top-3 {
      position: absolute;
      left: 3274px;
      top: $top;
    }

    .horn-top-4 {
      position: absolute;
      left: 2244px;
      top: $top;
    }

    .horn-top-5 {
      position: absolute;
      left: 2734px;
      top: $top;
    }

    .horn-top-6 {
      position: absolute;
      left: 3226px;
      top: $top;
    }
  }

  .horn-bottom {
    .stake-horn {
      position: absolute;
      left: 0px;
      top: 200px;
    }

    $bottomTop: 0;

    &>div img {
      height: 215px;
    }

    .horn-bottom-1 {
      position: absolute;
      left: 654px;
      top: $bottomTop
    }

    .horn-bottom-2 {
      position: absolute;
      left: 2132px;
      top: $bottomTop
    }

    .horn-bottom-3 {
      position: absolute;
      left: 1376px;
      top: $bottomTop
    }

    .horn-bottom-4 {
      position: absolute;
      left: 1865px;
      top: $bottomTop
    }

    .horn-bottom-5 {
      position: absolute;
      left: 2356px;
      top: $bottomTop
    }

    .horn-bottom-6 {
      position: absolute;
      left: 2843px;
      top: $bottomTop
    }
  }

  .device {
    position: absolute;
    left: -46px;
    top: 0px;

    .device-top {
      .device-top-1 {
        position: absolute;
        left: 929px;
        top: 231px;
        width: 26px;
        height: 69px;
      }

      .device-top-2 {
        position: absolute;
        left: 1171px;
        top: 230px;
        width: 40px;
        height: 70px;
      }

      .device-top-3 {
        position: absolute;
        left: 2149px;
        top: 230px;
        width: 26px;
        height: 69px;
      }

      .device-top-4 {
        position: absolute;
        left: 2388px;
        top: 230px;
        width: 40px;
        height: 70px;
      }

      .device-top-5 {
        position: absolute;
        left: 3104px;
        top: 230px;
        width: 26px;
        height: 69px;
      }

      .device-top-6 {
        position: absolute;
        left: 3372px;
        top: 202px;
        width: 130px;
        height: 98px;
      }
    }

    .device-bottom {
      position: absolute;
      left: 0px;
      top: 218px;
    }
  }
}

.config-button {
  position: absolute;
  left: 3698px;
  top: 46px;
  width: 129px;
  height: 38px;
  background: url(~@/assets/images/显示配置.png) no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}

.dialog-footer {
  display: flex;
  justify-content: space-evenly;

  .dialog-button {
    width: 158px;
    height: 42px;
    background: url(~@/assets/images/弹窗按钮.png) no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    text-align: center;
    /** 文本1 */
    font-family: 'PangMenZhengDao';
    font-size: 24px;
    font-weight: 400;
    line-height: 42px;
    color: rgba(255, 255, 255, 1);
  }
}

.dialog-close {
  position: absolute;
  right: 23px;
  top: 16px;
  width: 40px;
  height: 40px;
  background: url(~@/assets/images/弹窗关闭.png) no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.config-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .device-config{
    width: 276px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    & span{
      /** 文本1 */
      font-family: 'SourceHanSansSC';
      font-size: 22px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      width: 110px;
      margin-right: 10px;
    }
    & img{
      width: 67px;
      height: 26px;
      cursor: pointer;
    }
  }
}
</style>