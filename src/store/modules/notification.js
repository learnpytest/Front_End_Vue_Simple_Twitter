import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  GET_NOTIFICATION,
  IS_NOTIFICATION_OPEN,
} from "../store-types";

const state = {
  notification: {},
  isOpen: false,
};
const getters = {
  [GET_NOTIFICATION]: (state) => state.notification,
  [IS_NOTIFICATION_OPEN]: (state) => state.isOpen,
};
const actions = {
  [ADD_NOTIFICATION]: ({
    commit
  }, notification) => {
    commit("ADD_NOTIFICATION", notification);
    setTimeout(() => {
      commit("REMOVE_NOTIFICATION");
    }, 3000);
  },
  [REMOVE_NOTIFICATION]: ({
    commit
  }) => {
    commit("REMOVE_NOTIFICATION");
  },
};
const mutations = {
  [ADD_NOTIFICATION]: (state, notification) => {
    state.isOpen = true;
    state.notification = {
      ...notification,
    };
  },
  [REMOVE_NOTIFICATION]: (state) => {
    console.log("commit remove notification");
    state.isOpen = false;
    state.notification = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};