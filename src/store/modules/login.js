// need to use this for real sign in
import authorizationAPI from "../../apis/authorizationAPI";

import {
  vm
} from "../../main";

import {
  GET_LOGIN_INFO,
  SET_LOGIN_INFO,
  POST_LOGIN,
  POST_USER_LOGIN,
  SET_CURRENT_USER,
  ADD_NOTIFICATION,
} from "../store-types";

const state = {
  loginInfo: {
    email: "",
    password: "",
  },
};
const getters = {
  [GET_LOGIN_INFO]: (state) => state.loginInfo,
};
const actions = {
  [SET_LOGIN_INFO]: async ({
    commit
  }, {
    email,
    password
  }) => {
    commit(SET_LOGIN_INFO, {
      email,
      password,
    });
  },
  [POST_USER_LOGIN]: async ({
    state,
    commit,
    dispatch
  }) => {
    // if success set current user, save token to localstorage
    // write first start
    const email = state.loginInfo.email;
    const password = state.loginInfo.password;
    if (!email.length || !password.length) {
      dispatch(ADD_NOTIFICATION, {
        type: "error",
        message: "帳號不存在！",
      });
      return;
    }
    try {
      const res = await authorizationAPI.usersSignIn({
        email,
        password,
      });
      const {
        data,
        statusText
      } = res;
      console.log(data, statusText);
      if (statusText !== "OK" || data.status !== "success") {
        throw new Error(statusText);
      }
      //  假設成功登入，應該得到使用者資料，先存好token, 將使用者資料放入另一個action，再用mutation修改現在使用者，更新現在使用者，然後轉址
      localStorage.setItem("token", data.token);
      commit(SET_CURRENT_USER, data.user);
      vm.$router.push("/usermain");
      dispatch(ADD_NOTIFICATION, {
        type: "success",
        message: "成功登入",
      });
    } catch (err) {
      dispatch(ADD_NOTIFICATION, {
        type: "error",
        message: "帳號不存在!",
      });
    }
  },

  [POST_LOGIN]: async ({
    state,
    commit,
    dispatch
  }) => {
    // write first start
    const email = state.loginInfo.email;
    const password = state.loginInfo.password;
    if (!email.length || !password.length) {
      dispatch(ADD_NOTIFICATION, {
        type: "error",
        message: "帳號不存在！",
      });
      return;
    }

    const res = await authorizationAPI.signIn({
      email,
      password,
    });
    const {
      data,
      statusText
    } = res;
    if (statusText !== "OK" || data.status !== "success") {
      throw new Error(statusText);
    }
    //  假設成功登入，應該得到使用者資料，先存好token, 將使用者資料放入另一個action，再用mutation修改現在使用者，更新現在使用者，然後轉址
    localStorage.setItem("token", data.token);
    commit(SET_CURRENT_USER, data.user);
    vm.$router.push("/admin/tweets");
    dispatch(ADD_NOTIFICATION, {
      type: "success",
      message: "成功登入",
    });
  },
};
const mutations = {
  [SET_LOGIN_INFO]: (state, {
    email,
    password
  }) => {
    state.loginInfo = {
      ...state.loginInfo,
      ...{
        email,
        password,
      },
    };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};