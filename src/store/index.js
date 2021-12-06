import Vue from "vue";
import Vuex from "vuex";

import login from "./modules/login";
import user from "./modules/user";
import tweet from "./modules/tweet";
import adminUsers from "./modules/adminUsers";
import userAccount from "./modules/userAccount";
import notification from "./modules/notification";
import followship from "./modules/followship";
import likeship from "./modules/likeship";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    user,
    tweet,
    adminUsers,
    userAccount,
    notification,
    followship,
    likeship,
  },
});