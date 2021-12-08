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
  ADD_NOTIFICATION,
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

    try {
      const res = await followshipAPI.postFollowships(followingId);
      console.log("POST_FOLLOWSHIPID", followingId);
      const {
        data,
        statusText
      } = res;
      if (data.status !== "success" || statusText !== "OK") {
        throw new Error(data.message);
      }
      dispatch(ADD_NOTIFICATION, {
        type: "success",
        message: "跟隨成功",
      });
      // dispatch(GET_CURRENT_USER_FOLLOWINGS, currentUserId);
      // check
      dispatch(SET_CURRENT_USER_FOLLOWERS);
    } catch (err) {
      dispatch(ADD_NOTIFICATION, {
        type: "error",
        message: "載入資料失敗，請稍後再試",
      });
    }
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