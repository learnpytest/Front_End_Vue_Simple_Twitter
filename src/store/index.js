import Vue from "vue";
import Vuex from "vuex";

import login from "./modules/login";
import user from "./modules/user";
import tweet from "./modules/tweet";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    user,
    tweet,
  },
});