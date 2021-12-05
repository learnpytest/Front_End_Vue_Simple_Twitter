import usersAPI from "../../apis/usersAPI";
import {
  GET_ALL_USERS,
  SET_ALL_USERS
} from "../store-types";

const state = {
  adminUsers: [],
};
const getters = {
  [GET_ALL_USERS]: (state) => state.currentUser,
};
const actions = {
  [SET_ALL_USERS]: async () => {
    // 取得使用者權限，希望使用者每一次切換頁面路由都可以取一次currentUser，需要設定router 在router的beforeEach
    console.log("setallusers");
    try {
      const {
        data
      } = await usersAPI.all();
      console.log(data);
      // if(data.status === 'error') throw new Error(data.message)
    } catch (err) {
      console.log(err);
    }

    // todo replace the dummyCurrentUser with response by sending api
    // start
    // const response = await axios.get("https://fakestoreapi.com/products");
    // const {data, status, statusText} = response
    // if (status !== 'success' || data.status !== 'success') throw new Error('statusText')
    // const {id, name, email, image, isAdmin} = data
    // commit(SET_CURRENT_USER, {id, name, email, image, isAdmin});
    // end
  },
};
const mutations = {
  // 將使用SET_CURRENT_USER來驗證每一次轉址使用者是否仍有權限。需要設定router的beforeEach來監聽每一個轉址token有無變化
  [SET_ALL_USERS]: async (state, currentUser) => {
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