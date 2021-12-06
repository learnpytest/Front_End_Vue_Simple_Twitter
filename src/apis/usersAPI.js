import {
  apiHelper
} from "../apis/apiHelper";

export default {
  all() {
    return apiHelper.get("/admin/users");
  },
  getTop() {
    return apiHelper.get("/users/top");
  },
};