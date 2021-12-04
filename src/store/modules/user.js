// import axios from "axios";

import {
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  REVOKE_AUTHENTICATION,
} from "../store-types";

const state = {
  currentUser: {
    id: -1,
    name: "",
    email: "",
    image: "",
    isAdmin: false,
  },
  isAuthenticated: false,
};
const getters = {
  [GET_CURRENT_USER]: (state) => state.currentUser,
};
const actions = {
  [REVOKE_AUTHENTICATION]: async ({
    commit
  }) => {
    console.log("REVOKE_AUTHENTICATION");
    commit(REVOKE_AUTHENTICATION);
  },
  [SET_CURRENT_USER]: async ({
    commit
  }, currentUser) => {
    // todo replace the dummyCurrentUser with response by sending api
    // start
    // const response = await axios.get("https://fakestoreapi.com/products");
    // const {data, status, statusText} = response
    // if (status !== 'success' || data.status !== 'success') throw new Error('statusText')
    // commit(SET_CURRENT_USER, response.data);
    // end
    commit(SET_CURRENT_USER, currentUser);
  },
};
const mutations = {
  [REVOKE_AUTHENTICATION]: async (state) => {
    console.log("REVOKE_AUTHENTICATION");
    state.currentUser = {};
    state.isAuthenticated = false;
    // todo 移除locastorage token
    // localStorage.removeItem()
    //測試是否還能取得資料，在此階段，期待結果將是，能進入其他頁面但不能取得資料，此步驟保護api。下一步驟為若使用者沒有登入，直接再網址輸入api，將使用者導回登入頁而不是顯示其他頁面。如果使用者已經login，若使用者還想進入登入頁，將使用者直接導向抵達頁。
    console.log(state.currentUser);
  },
  [SET_CURRENT_USER]: (state, currentUser) => {
    state.currentUser = {
      ...state.currentUser,
      ...currentUser,
    };
    state.isAuthenticated = true;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};