// this will be merged into usersAPI
import {
  apiHelper
} from "../apis/apiHelper";

export default {
  getCurrentUser() {
    return apiHelper.get("/get_current_user");
  },
  signUp({
    account,
    name,
    email,
    password,
    checkPassword
  }) {
    return apiHelper.post("/users", {
      account,
      name,
      email,
      password,
      checkPassword,
    });
  },
};