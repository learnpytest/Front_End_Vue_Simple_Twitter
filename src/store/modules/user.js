// import currentUserAPI from "../../apis/currentUserAPI";

import {
  vm
} from "../../main";

import {
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  REVOKE_AUTHENTICATION,
  ADD_NOTIFICATION,
} from "../store-types";

const state = {
  currentUser: {},
  isAuthenticated: false,
};
const getters = {
  [GET_CURRENT_USER]: (state) => state.currentUser,
};
const actions = {
  [REVOKE_AUTHENTICATION]: async ({
    commit,
    dispatch
  }) => {
    console.log("REVOKE_AUTHENTICATION");
    commit(REVOKE_AUTHENTICATION);
    dispatch(ADD_NOTIFICATION, {
      type: "success",
      message: "成功登出",
    });
  },
  [SET_CURRENT_USER]: async ({
    commit
  }, currentUser) => {
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

    commit(SET_CURRENT_USER, currentUser);
  },
};
const mutations = {
  [REVOKE_AUTHENTICATION]: async (state) => {
    console.log("REVOKE_AUTHENTICATION");
    state.currentUser = {};
    state.isAuthenticated = false;
    localStorage.removeItem("token");
    //測試是否還能取得資料，在此階段，期待結果將是，能進入其他頁面但不能取得資料，此步驟保護api。下一步驟為若使用者沒有登入，直接再網址輸入api，將使用者導回登入頁而不是顯示其他頁面。如果使用者已經login，若使用者還想進入登入頁，將使用者直接導向抵達頁。
    console.log(state.currentUser);
    setTimeout(() => {
      alert("SUCCESSFULLY LOGOUT");
    }, 500);
    vm.$router.push("/admin/login");
  },
  // 將使用SET_CURRENT_USER來驗證每一次轉址使用者是否仍有權限。需要設定router的beforeEach來監聽每一個轉址token有無變化
  [SET_CURRENT_USER]: async (state, currentUser) => {
    try {
      state.currentUser = {
        ...currentUser,
      };
      state.isAuthenticated = true;

      return true;
    } catch (err) {
      console.log(
        "SET_CURRENT_USER cannot get success result, this is not authenticated user"
      );
      return false;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};