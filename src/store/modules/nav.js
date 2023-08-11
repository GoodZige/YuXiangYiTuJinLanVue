
const state = {
  navActice: '/index',
  navPage: 1
}

const mutations = {
  set_navActice: (state, value) => {
    state.navActice = value
  },
  set_navPage: (state, value) => {
    state.navPage = value
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
