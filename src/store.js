import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    key: null,
    appeals: [],
    premises: []
  },
  mutations: {
    setKey: (state, newKey) => state.key = newKey,
    setAppeals: (state, newAppeals) => state.appeals = newAppeals,
    setPremises: (state, newPremises) => state.premises = newPremises
  },
  getters: {
    key: (state) => state.key,
    appeals: (state) => state.appeals,
    premises: (state) => state.premises
  }
})
