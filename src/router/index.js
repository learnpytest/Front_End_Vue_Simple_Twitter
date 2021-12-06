import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

const authenticateIsAdmin = (to, from, next) => {
  const currentUser = store.state.user.currentUser;
  if (currentUser && currentUser.account !== "admin") {
    alert("PERSSION DENIED");
    // next("PERSSION DENIED");
    next("/admin/login");
  }
  next();
};

// const authenticateIsLoggedinUser = (to, from, next) => {
//   const currentUser = store.state.user.currentUser;
//   if (currentUser && currentUser.account === "admin") {
//     alert("YOU ARE NOT LOGGEDIN YET");
//     // next("PERSSION DENIED");
//     next("/login");
//   } else if (currentUser && store.state.user.isAuthenticated) {
//     next();
//   } else {
//     alert("YOU ARE NOT LOGGEDIN YET");
//     // next("PERSSION DENIED");
//     next("/login");
//   }
// };

Vue.use(VueRouter);

const routes = [{
    path: "/user",
    name: "user",
    component: () => import("@/views/User"),
  },
  {
    path: "/reply",
    name: "reply-list",
    component: () => import("@/views/ReplyList"),
  },
  {
    path: "/login",
    name: "user-login",
    component: () => import("@/views/UserLogin"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/UserRegister"),
  },

  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("@/views/AdminLogin"),
  },
  {
    path: "/admin/users",
    name: "admin-users-list",
    component: () => import("@/views/AdminUsers"),
    beforeEnter: authenticateIsAdmin,
  },
  {
    path: "/admin/tweets",
    name: "admin-tweet-list",
    component: () => import("@/views/AdminMain"),
    beforeEnter: authenticateIsAdmin,
  },
  {
    path: "/usermain",
    name: "UserMain",
    component: () => import("@/views/UserMain"),
    //要移回來
    // beforeEnter: authenticateIsLoggedinUser,
  },
  {
    path: "/user/setting",
    name: "user-setting",
    component: () => import("@/views/UserSetting"),
  },
  {
    path: "/",
    name: "root",
    redirect: "/login",
  },
];

const router = new VueRouter({
  linkExactActiveClass: "active",
  routes,
});

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem("token");
  // const tokenInStore = store.state.token

  // if (tokenInLocalStorage & tokenInLocalStorage !== tokenInStore) {
  //   isAuthenticated = await store.dispatch('getCurrentUser')
  // }
  let isAuthenticated = false;
  if (tokenInLocalStorage) {
    isAuthenticated = store.state.user.isAuthenticated;
  }
  // const pathsWithoutAuthentication = ['admin/login', 'login']
  const pathsWithoutAuthentication = ["user-login"];
  const adminPathsWithoutAuthentication = ["admin-login"];

  // if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
  //   next("/login");
  //   return;
  // }
  console.log(to.name, isAuthenticated);
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next("/usermain");
    return;
  }
  console.log(to.name, isAuthenticated);
  if (
    store.state.user.currentUser.account === "admin" &&
    adminPathsWithoutAuthentication.includes(to.name)
  ) {
    next("/admin/tweets");
    return;
  }
  next();
});

export default router;