// import currentUserAPI from "../../apis/currentUserAPI";

// import {
//   vm
// } from "../../main";

import {
  GET_CURRENT_USER_FOLLOWERS,
  SET_CURRENT_USER_FOLLOWERS,
  GET_CURRENT_USER_FOLLOWINGS,
  SET_CURRENT_USER_FOLLOWINGS,
  POST_FOLLOWSHIP,
  DELETE_FOLLOWSHIP,
} from "../store-types";

const state = {
  currentUserFollowers: [],
  currentUserFollowings: [],
};
const getters = {
  [GET_CURRENT_USER_FOLLOWERS]: (state) => state.currentUserFollowers,
  [GET_CURRENT_USER_FOLLOWINGS]: (state) => state.currentUserFollowings,
};
const actions = {
  [SET_CURRENT_USER_FOLLOWERS]: async ({
    commit
  }, currentUserFollowers) => {
    // send api
    console.log("setcurrentUserFollowers", currentUserFollowers);
    commit(SET_CURRENT_USER_FOLLOWERS, currentUserFollowers);
  },
  [SET_CURRENT_USER_FOLLOWINGS]: async ({
    commit
  }, currentUserFollowings) => {
    // send api
    console.log("setcurrentUserFollowings", currentUserFollowings);
    commit(SET_CURRENT_USER_FOLLOWERS, currentUserFollowings);
  },
  [POST_FOLLOWSHIP]: async ({
    dispatch
  }, targetedUserId) => {
    // send api
    console.log("POST_FOLLOWSHIP", targetedUserId);
    // dispatch(GET_CURRENT_USER_FOLLOWINGS, currentUserId);
    dispatch(GET_CURRENT_USER_FOLLOWINGS);
  },
  [DELETE_FOLLOWSHIP]: async ({
    dispatch
  }, targetedUserId) => {
    // send api
    console.log("DELETE_FOLLOWSHIP", targetedUserId);
    // dispatch(GET_CURRENT_USER_FOLLOWINGS, currentUserId);
    dispatch(GET_CURRENT_USER_FOLLOWINGS);
  },
};
const mutations = {
  [SET_CURRENT_USER_FOLLOWERS]: async (state, currentUserFollowers) => {
    state.currentUserFollowers = [...currentUserFollowers];
    console.log("setcurrentUserFollowers mutation");
  },
  [SET_CURRENT_USER_FOLLOWERS]: async (state, currentUserFollowings) => {
    state.currentUserFollowings = [...currentUserFollowings];
    console.log("setcurrentUserFollowings mutation");
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};