import {
  apiHelper
} from "../apis/apiHelper";

export default {
  signIn({
    email,
    password
  }) {
    return apiHelper.post("/admin/signin", {
      email,
      password,
    });
  },
  usersSignIn({
    email,
    password
  }) {
    return apiHelper.post("/users/signin", {
      email,
      password,
    });
  },
};