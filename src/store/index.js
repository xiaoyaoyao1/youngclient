import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_USER = 'SET_USER'

const state = new Vuex.Store({
  state: {
    username: window.sessionStorage.getItem('username')
  },
  mutations: {
    SET_USER: (state,data) => {
      state.username = data
      window.sessionStorage.setItem('username',data)
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
})

export default state