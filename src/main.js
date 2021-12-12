import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import './assets/scss/reset.scss'
import store from "./store";

import VueSocketIO from "vue-socket.io";
import {
  io
} from "socket.io-client";
// const socket = io("http://localhost:3000");

Vue.config.productionTip = false;
const socketOptions = {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  forceNew: true,
  allowUpgrades: false,
  pingTimeout: 30000,
  transports: ["websocket", "polling"],
};

// const socket = io(
//   "http://2dd8-2001-b011-e-59a3-9de1-69a7-7562-a92f.ngrok.io/",
//   socketOptions
// );

const socket = io(
  "https://twitter-llrs-chatroom.herokuapp.com/",
  socketOptions
);

socket.onAny((event, ...args) => {
  console.log("main.js收到的資訊", event, args);
});

// socket.emit("message", "Hello user");

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: socket,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

Vue.directive("focus", {
  inserted: function (el) {
    el.focus();
    console.log(el);
  },
});

export const vm = new Vue({
  router,
  store,
  sockets: {
    connecting() {
      console.log("main.js connecting");
    },
    disconnect() {
      console.log("main.js Disconnect");
    },
    connect_failed() {
      console.log("main.js connect failed");
    },
    connect() {
      console.log("main.js connected in main.js");
    },

    allMessages: function (data) {
      console.log("main.js allMessages", data);
      store.state.allMessages = [...data];
    },
    newMessage: function (obj) {
      console.log("使用者加入", obj);
      store.state.allMessages.push({
        ...obj,
      });
    },
    allUsers: function (data) {
      console.log("main.js allUsers", data);
      store.state.allUsers = [...data];
    },
    newUser: function (obj) {
      const isExisted = store.state.allUsers.find((user) => user.id === obj.id);
      if (isExisted) return;
      store.state.allUsers.push({
        ...obj,
      });
    },
    joined: function (obj) {
      socket.emit("message", {
        id: obj.id,
        name: obj.name,
        message: 0,
        type: 1,
      });
    },

    leaved: function (obj) {
      const isExisted = store.state.allUsers.find((user) => user.id === obj.id);
      if (!isExisted) return;
      store.state.allUsers.filter((user) => user.id === obj.id);
      socket.emit("message", {
        id: obj.id,
        name: obj.name,
        message: 0,
        type: -1,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");

export default socket;