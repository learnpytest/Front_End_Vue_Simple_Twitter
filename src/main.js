import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

// import "@fortawesome/fontawesome-free/css/all.css";
// import "@fortawesome/fontawesome-free/js/all.js";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("https://twitter-llrs-chatroom.herokuapp.com/"), //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");
