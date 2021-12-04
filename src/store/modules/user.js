// import axios from "axios";
// import currentUserAPI from "../../apis/currentUserAPI";
// 使用dummy data當作從api取回來的當前使用者
import {
  dummyUserAdmin
} from "../../data/dummyUsers";

import {
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  REVOKE_AUTHENTICATION,
} from "../store-types";

const state = {
  currentUser: {
    id: -1,
    account: "",
    email: "",
    name: "",
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
  }) => {
    // 取得使用者權限，希望使用者每一次切換頁面路由都可以取一次currentUser，需要設定router 在router的beforeEach
    // try{
    //   const {
    //     data
    //   } = await currentUserAPI.getCurrentUser()
    // 如果沒有成功，應該導回登入頁(需要call logout嗎)
    //   if(data.status === 'error') throw new Error(data.message)
    // }catch(err){
    //   console.log(err)
    // }

    // todo replace the dummyCurrentUser with response by sending api
    // start
    // const response = await axios.get("https://fakestoreapi.com/products");
    // const {data, status, statusText} = response
    // if (status !== 'success' || data.status !== 'success') throw new Error('statusText')
    // const {id, name, email, image, isAdmin} = data
    // commit(SET_CURRENT_USER, {id, name, email, image, isAdmin});
    // end
    // 暫時在這裡測試
    // 假設dummy data是取回來的現在使用者

    const {
      id,
      name,
      account,
      email,
      password,
      image,
      isAdmin
    } =
    dummyUserAdmin;
    commit(SET_CURRENT_USER, {
      id,
      name,
      account,
      email,
      password,
      image,
      isAdmin,
    });
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
  [SET_CURRENT_USER]: (
    state, {
      id,
      name,
      account,
      email,
      password,
      image,
      isAdmin
    }
  ) => {
    state.currentUser = {
      ...state.currentUser,
      ...{
        id,
        name,
        account,
        email,
        password,
        image,
        isAdmin,
      },
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