import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    admin: null,
    token: null,
    fullName: null
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setAdmin(state, admin) {
      state.admin = admin;
    },
    setToken(state, token) {
      state.token = token;
    },
    setFullName(state, fullName) {
      state.fullName = fullName;
    },
    resetState(state) {
      state.userId = null;
      state.token = null;
      state.fullName = null;
      state.admin = null;
    }
    
  },
  actions: {

  },
  getters: {
    isLoggedIn(state){
      return !!state.token;
    },

  },
  modules: {
    
  },
  plugins: [createPersistedState()]
});
