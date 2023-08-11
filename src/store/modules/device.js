const state = {
  deviceStatusList: {
    road: true,
    signal: true,
    wind: false,
    door: true,
    broadcast:true,
    board:true,
  },
}

const mutations = {
  SET_DEVICE_STATUS_LIST: (state, list) => {
    state.deviceStatusList = list
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
