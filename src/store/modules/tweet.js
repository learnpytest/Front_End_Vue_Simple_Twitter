// import axios from "axios";
// import api
import tweets from "../../apis/tweets";

import {
  GET_ALL_TWEETS,
  SET_ALL_TWEETS,
  GET_TWEETS_FILTER_TYPE,
  SET_TWEETS_FILTER_TYPE,
  GET_ONE_USER_TWEETS,
  SET_ONE_USER_TWEETS,
  GET_ONE_USER_REPLIES,
  SET_ONE_USER_REPLIES,
  GET_ONE_USER_LIKES,
  SET_ONE_USER_LIKES,
} from "../store-types";

const state = {
  tweetsFilterType: {
    getter: "",
    setter: "",
  },
  allTweets: [],
  oneUserTweets: [],
  oneUserReplies: [],
  onUserLikes: [],
};
const getters = {
  [GET_TWEETS_FILTER_TYPE]: (state) => state.tweetsFilterType,
  [GET_ALL_TWEETS]: (state) => state.allTweets,
  [GET_ONE_USER_TWEETS]: (state) => state.oneUserTweets,
  [GET_ONE_USER_REPLIES]: (state) => state.oneUserReplies,
  [GET_ONE_USER_LIKES]: (state) => state.onUserLikes,
};
const actions = {
  [SET_TWEETS_FILTER_TYPE]: async ({
    commit
  }, filterType) => {
    commit(SET_TWEETS_FILTER_TYPE, filterType);
  },
  [SET_ALL_TWEETS]: async ({
    commit
  }) => {
    console.log("setalltweets");
    const res = await tweets.all();
    // send api to get reponse of all tweets and pass tweets to mutation to change state all the tweets
    // start
    const {
      data,
      statusText
    } = res;
    if (statusText !== "OK") throw new Error("statusText");
    commit(SET_ALL_TWEETS, data);
  },
  [SET_ONE_USER_TWEETS]: async ({
    commit,
    rootState
  }) => {
    // send api

    console.log("setoneusertweets");
    try {
      const userId = rootState.user.currentUser.id;
      const res = await tweets.getOneUserTweet(userId);
      const {
        data,
        statusText
      } = res;
      console.log(res);
      if (statusText !== "OK") throw new Error("statusText");
      commit(SET_ONE_USER_TWEETS, data);
    } catch (err) {
      throw new Error(err);
    }
  },
  [SET_ONE_USER_REPLIES]: async () => {
    // send api

    console.log("vuex set one user replies");
    // try {
    //   const userId = rootState.user.currentUser.id;
    //   const res = await tweets.getOneUserReplies(userId);
    //   // const {
    //   //   data,
    //   //   statusText
    //   // } = res;
    //   console.log(res);
    //   // if (statusText !== "OK") throw new Error("statusText");
    //   // commit(SET_ONE_USER_TWEETS, data);
    // } catch (err) {
    //   throw new Error(err);
    // }
  },
  [SET_ONE_USER_LIKES]: async () => {
    // send api
    console.log("set one user likes");
  },
};
const mutations = {
  [SET_TWEETS_FILTER_TYPE]: (state, filterType) => {
    state.tweetsFilterType = filterType;
  },
  [SET_ALL_TWEETS]: (state, allTweets) => {
    state.allTweets = [...state.allTweets, ...allTweets];
  },
  [SET_ONE_USER_TWEETS]: (state, oneUserTweets) => {
    state.oneUserTweets = [...state.oneUserTweets, ...oneUserTweets];
  },
  [SET_ONE_USER_REPLIES]: (state, oneUserReplies) => {
    state.oneUserReplies = [...oneUserReplies];
  },
  [SET_ONE_USER_LIKES]: (state, onUserLikes) => {
    state.onUserLikes = [...onUserLikes];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};