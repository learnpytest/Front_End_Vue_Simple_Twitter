import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

const authenticateIsAdmin = (to, from, next) => {
  const currentUser = store.state.user.currentUser;
  if (currentUser && !currentUser.isAdmin) {
    alert("PERSSION DENIED");
    // next("PERSSION DENIED");
    next("/admin/login");
  }
  next();
};

Vue.use(VueRouter);

const routes = [{
    path: "/login",
    name: "user-login",
    component: () => import("@/views/UserLogin"),
  },
  {
    path: "/register",
    name: "register",
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
    path: "/",
    name: "root",
    redirect: "/login",
  },
];

const router = new VueRouter({
  linkExactActiveClass: "active",
  routes,
});

export default router;