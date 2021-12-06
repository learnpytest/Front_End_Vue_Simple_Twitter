// need to use this for real sign in
import userAccountAPI from "../../apis/userAccountAPI";

import {
  vm
} from "../../main";

import {
  GET_ACCOUNT_INFO,
  SET_ACCOUNT_INFO,
  POST_ACCOUNT,
  PUT_ACCOUNT,
  ADD_NOTIFICATION,
} from "../store-types";

const state = {
  accountInfo: {
    account: "",
    username: "",
    email: "",
    password: "",
    checkPassword: "",
  },
};
const getters = {
  [GET_ACCOUNT_INFO]: (state) => state.accountInfo,
};
const actions = {
  [SET_ACCOUNT_INFO]: async ({
    commit
  }, accountInfo) => {
    commit(SET_ACCOUNT_INFO, accountInfo);
  },
  [POST_ACCOUNT]: async ({
    state,
    dispatch
  }) => {
    // todo 必填欄位與密碼確認的提示
    const {
      account,
      username: name,
      email,
      password,
      checkPassword,
    } = state.accountInfo;
    if (name.length > 50) {
      dispatch(ADD_NOTIFICATION, {
        type: "error",
        message: "字數超出上限！",
      });
      return;
    }
    if (!account || !name || !email || !password) {
      dispatch(ADD_NOTIFICATION, {
        type: "error",
        message: "內容不可空白",
      });
      return;
    }
    if (password !== checkPassword) {
      dispatch(ADD_NOTIFICATION, {
        type: "error",
        message: "密碼不相符",
      });
      return;
    }
    try {
      //  request api
      const res = await userAccountAPI.signUp({
        account,
        name,
        email,
        password,
        checkPassword,
      });

      if (res.data.status !== "success") {
        if (res.data.message === "Email has already existed!") {
          dispatch(ADD_NOTIFICATION, {
            type: "error",
            message: "「email 已重覆註冊！」",
          });
          return;
        }
        if (res.data.message === "Account has already existed!") {
          dispatch(ADD_NOTIFICATION, {
            type: "error",
            message: "「account 已重覆註冊！」",
          });
          return;
        }
      }
      // 導向登入頁提示註冊成功
      vm.$router.push("/login");
      dispatch(ADD_NOTIFICATION, {
        type: "success",
        message: "成功註冊",
      });
    } catch (err) {
      throw new Error(err);
    }
  },
  [PUT_ACCOUNT]: async ({
    rootState,
    state,
    dispatch
  }) => {
    // todo 必填欄位與密碼確認的提示
    const {
      account,
      username: name,
      email,
      password,
      checkPassword,
    } = state.accountInfo;
    if (!account || !name || !email || password !== checkPassword) {
      throw new Error("欄位填寫不正確");
    }
    //  request api
    const id = rootState.user.currentUser.id;
    const res = await userAccountAPI.update(id, {
      account,
      name,
      email,
      password,
      checkPassword,
    });
    const {
      data,
      statusText
    } = res;
    if (data.status !== "success" || statusText !== "OK") {
      throw new Error(data.message);
    }
    // 提示修改資料成功再拉取當前使用者資料

    dispatch(ADD_NOTIFICATION, {
      type: "success",
      message: "已編輯個人資料",
    });
  },
};
const mutations = {
  [SET_ACCOUNT_INFO]: (state, accountInfo) => {
    state.accountInfo = {
      ...state.accountInfo,
      ...accountInfo,
    };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};