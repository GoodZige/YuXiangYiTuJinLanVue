
const state = {
  activeBaseStation: '' // 区域id	
}

const mutations = {
  set_activeBaseStation: (state, value) => {
    state.activeBaseStation = value
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
