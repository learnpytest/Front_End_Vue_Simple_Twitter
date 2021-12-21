import tweets from "../../apis/tweets";

import {
  vm
} from "../../main";

import {
  ADD_NOTIFICATION,
  GET_ALL_TWEETS,
  SET_ALL_TWEETS,
  GET_FILLTERED_TWEETS,
  GET_ONE_USER_TWEETS,
  SET_ONE_USER_TWEETS,
  GET_ONE_USER_REPLIES,
  SET_ONE_USER_REPLIES,
  GET_ONE_USER_LIKES,
  SET_ONE_USER_LIKES,
} from "../store-types";

const state = {
  allTweets: {
    data: [],
    isLoading: true,
  },
  oneUserTweets: [],
  oneUserReplies: [],
  oneUserLikes: [],
  filteredTweets: [],
};
const getters = {
  [GET_FILLTERED_TWEETS]: (state) => state.filteredTweets,
  [GET_ALL_TWEETS]: (state) => state.allTweets,
  [GET_ONE_USER_TWEETS]: (state) => state.oneUserTweets,
  [GET_ONE_USER_REPLIES]: (state) => state.oneUserReplies,
  [GET_ONE_USER_LIKES]: (state) => state.oenUserLikes,
};
const actions = {
  [SET_ALL_TWEETS]: async ({
    commit,
    dispatch
  }) => {
    try {
      const res = await tweets.all();
      // send api to get reponse of unFiltered tweets and pass tweets to mutation to change state unFiltered the tweets
      // start
      const {
        data,
        statusText
      } = res;
      if (statusText !== "OK") throw new Error("statusText");
      const tweetState = {
        data,
        isLoading: false,
      };
      commit(SET_ALL_TWEETS, tweetState);
    } catch (err) {
      setTimeout(() => {
        setTimeout(() => {
          dispatch(ADD_NOTIFICATION, {
            type: "error",
            message: "載入資料失敗，請重新登入",
          });
          vm.$router.push("/login");
        }, 3000);
      }, 5000);
    }
  },
  [SET_ONE_USER_TWEETS]: async ({
    commit
  }, userId) => {
    // send api

    try {
      // const userId = rootState.user.currentUser.id;
      const res = await tweets.getOneUserTweet(userId);
      const {
        data,
        statusText
      } = res;
      if (statusText !== "OK") throw new Error("statusText");
      commit(SET_ONE_USER_TWEETS, data);
    } catch (err) {
      throw new Error(err);
    }
  },
  [SET_ONE_USER_REPLIES]: async ({
    commit
  }, userId) => {
    // send api

    try {
      // const userId = rootState.user.currentUser.id;
      const res = await tweets.getOneUserReplies(userId);
      const {
        data,
        statusText
      } = res;

      if (statusText !== "OK") throw new Error("statusText");
      commit(SET_ONE_USER_REPLIES, data);
    } catch (err) {
      throw new Error(err);
    }
  },
  [SET_ONE_USER_LIKES]: async ({
    commit
  }, userId) => {
    try {
      const res = await tweets.getOneUserLikes(userId);
      const {
        data,
        statusText
      } = res;
      console.log("try", data);
      if (statusText !== "OK") throw new Error("statusText");
      commit(SET_ONE_USER_LIKES, data);
    } catch (err) {
      throw new Error(err);
    }
  },
};
const mutations = {
  [SET_ALL_TWEETS]: (state, tweetState) => {
    // state.filteredTweets = [...allTweets];
    state.allTweets = {
      ...tweetState,
    };
  },
  [SET_ONE_USER_TWEETS]: (state, oneUserTweets) => {
    // state.oneUserTweets = [...oneUserTweets];
    state.filteredTweets = [...oneUserTweets];
  },
  [SET_ONE_USER_REPLIES]: (state, oneUserReplies) => {
    // state.oneUserReplies = [...oneUserReplies];
    state.filteredTweets = [...oneUserReplies];
  },
  [SET_ONE_USER_LIKES]: (state, oneUserLikes) => {
    // state.oneUserLikes = [...oneUserLikes];
    state.filteredTweets = [...oneUserLikes];
  },
  [SET_ONE_USER_REPLIES]: (state, oneUserReplies) => {
    // state.oneUserReplies = [...oneUserReplies];
    state.filteredTweets = [...oneUserReplies];
  },
  [SET_ONE_USER_LIKES]: (state, oneUserLikes) => {
    // state.oneUserLikes = [...oneUserLikes];
    state.filteredTweets = [...oneUserLikes];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};