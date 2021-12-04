// need to use this for real sign in
// import authorizationAPI from "../../apis/authorizationAPI";

import {
  vm
} from "../../main";

// todo this is initial dummy data
// import {
//   dummyCurrentUser
// } from "../../data/dummyUsers";
// 使用dummy data當作從api取回來的當前使用者
import {
  dummyUserAdmin
} from "../../data/dummyUsers";

// import axios from "axios";
import {
  GET_LOGIN_INFO,
  SET_LOGIN_INFO,
  POST_LOGIN,
  SET_CURRENT_USER,
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
    console.log("setlogininfo");
    commit(SET_LOGIN_INFO, {
      email,
      password,
    });
  },

  [POST_LOGIN]: async ({
    state,
    dispatch
  }) => {
    // todo request login api with state.email, state.password
    // if success set current user, save token to localstorage
    // write first start
    // authorizationAPI.signIn({email:state.loginInfo.email, password:state.loginInfo.password}).then(res =>{
    //   const {data, statusText} = res
    // if(statusText !=="OK" || data.status !== 'success'){throw new Error(statusText)}
    // 假設成功登入，應該得到使用者資料，先存好token, 將使用者資料放入另一個action，再用mutation修改現在使用者，更新現在使用者，然後轉址
    //   localStorage.setItem('simple-twitter-token', data.token)
    //    dispatch(SET_CURRENT_USER, dummyCurrentUser);
    //  vm.$router.push("/admin/tweets");
    // })
    // end
    // dispatch(SET_CURRENT_USER, dummyCurrentUser);

    // 暫時在這裡測試
    if (
      state.loginInfo.email === "root@example.com" &&
      state.loginInfo.password === "12345678"
    ) {
      console.log(state.loginInfo);
      dispatch(SET_CURRENT_USER, dummyUserAdmin);
      dispatch(SET_LOGIN_INFO, {
        email: "",
        password: "",
      });
      vm.$router.push("/admin/tweets");
      setTimeout(() => {
        alert("SUCCESSFULLY LOGGED IN BACKEND");
      }, 1000);
    } else {
      alert("Please enter valid email and password");
    }
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