// import currentUserAPI from "../../apis/currentUserAPI";
import followshipAPI from "../../apis/followshipAPI";
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
    commit,
    rootState
  }) => {
    // send api
    const userId = rootState.user.currentUser.id;
    console.log("userId", userId);
    try {
      const res = await followshipAPI.getFollowers(userId);
      const {
        statusText,
        data
      } = res;
      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      commit(SET_CURRENT_USER_FOLLOWERS, data);
    } catch (err) {
      console.log(err);
    }
  },
  [SET_CURRENT_USER_FOLLOWINGS]: async ({
    commit,
    rootState
  }) => {
    // send api
    const userId = rootState.user.currentUser.id;

    try {
      const res = await followshipAPI.getFollowings(userId);
      const {
        statusText,
        data
      } = res;
      if (statusText !== "OK") {
        throw new Error(statusText);
      }
      commit(SET_CURRENT_USER_FOLLOWINGS, data);
    } catch (err) {
      console.log(err);
    }
  },
  [POST_FOLLOWSHIP]: async ({
    dispatch
  }, followingId) => {
    // send api
    // console.log("POST_FOLLOWSHIP", followingId);

    const res = await followshipAPI.postFollowships(followingId);
    console.log("POST_FOLLOWSHIP", res);
    // dispatch(GET_CURRENT_USER_FOLLOWINGS, currentUserId);
    dispatch(GET_CURRENT_USER_FOLLOWINGS);
  },
  [DELETE_FOLLOWSHIP]: async ({
    dispatch
  }, targetedUserId) => {
    // send api
    console.log(targetedUserId);
    dispatch(GET_CURRENT_USER_FOLLOWINGS);
  },
};
const mutations = {
  [SET_CURRENT_USER_FOLLOWERS]: async (state, currentUserFollowers) => {
    state.currentUserFollowers = [...currentUserFollowers];
  },
  [SET_CURRENT_USER_FOLLOWINGS]: async (state, currentUserFollowings) => {
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