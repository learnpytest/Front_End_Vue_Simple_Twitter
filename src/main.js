import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// change for routing
export const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");