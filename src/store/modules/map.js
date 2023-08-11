/*
 * @Description:
 * @Author: jk
 * @Date: 2021-12-13 09:22:05
 * @LastEditTime: 2021-12-27 11:39:55
 * @LastEditors: jk
 * @Reference:
 * @FilePath: \qifu-tunnel-phase-ii\src\store\modules\map.js
 */
import {
  getAccidentList
} from "@/api/common/command/event";
// import dayjs from "dayjs";

// const gradeEnum = {
//   "重大": 'I级',
//   "较大": 'II级',
//   "一般": 'III级',
//   '普通': 'IV级'
// }



const state = {
  eventList: [],
  mapStatus: false,
  selectedEventId: "",
}

const mutations = {
  SET_EVENT_LIST: (state, list) => {
    state.eventList = list
  },
  CHANGE_MAP_STATE: (state, status) => {
    state.mapStatus = status
  },
  CHANGE_SELECTED_EVENT_ID: (state, id) => {
    state.selectedEventId = id
  }
}

const actions = {
  async getEventList({
    commit
  }) {
    const {
      data
    } = await getAccidentList();
    try {
      console.log('22222222222', data);
      data.map((list) => {
        // list.accidentTime = dayjs(list.accidentTime).format("MM-DD HH:mm")
        // list.grade = gradeEnum[list.grade] || list.grade

        const curProcessIndex = list.curProcessIndex;
        for (let index = 0; index < list.accidentTrackingProcess.length - 1; index++) {
          list.accidentTrackingProcess[index].activeNum =
            list.accidentTrackingProcess.length - 1;
          const bre = false;
          list.accidentTrackingProcess[index].processList.map((last, i) => {
            if (last.processIndex === curProcessIndex) {
              list.accidentTrackingProcess[index].activeNum =
                list.accidentTrackingProcess[index].processList.length - i + 1;
              bre = true;
            }
          });
          if (bre) {
            break;
          }
        }
      });
    } catch (error) {}
    console.log('22222', data);
    commit("SET_EVENT_LIST", data)
    // this.$store.commit("map/SET_EVENT_LIST", data);
    // this.accId = data[0].accidentId;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
