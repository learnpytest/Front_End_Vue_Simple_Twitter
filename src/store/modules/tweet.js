// import axios from "axios";
// import api
import tweets from "../../apis/tweets";

import {
  GET_ALL_TWEETS,
  SET_ALL_TWEETS,
  GET_FILLTERED_TWEETS,
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
  oneUserLikes: [],
  filteredTweets: [],
};
const getters = {
  [GET_FILLTERED_TWEETS]: (state) => state.filteredTweets,
  [GET_TWEETS_FILTER_TYPE]: (state) => state.tweetsFilterType,
  [GET_ALL_TWEETS]: (state) => state.allTweets,
  [GET_ONE_USER_TWEETS]: (state) => state.oneUserTweets,
  [GET_ONE_USER_REPLIES]: (state) => state.oneUserReplies,
  [GET_ONE_USER_LIKES]: (state) => state.oenUserLikes,
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
    // send api
    console.log("set one user likes");
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
  [SET_TWEETS_FILTER_TYPE]: (state, filterType) => {
    state.tweetsFilterType = filterType;
  },
  [SET_ALL_TWEETS]: (state, allTweets) => {
    state.allTweets = [...state.allTweets, ...allTweets];
  },
  [SET_ONE_USER_TWEETS]: (state, oneUserTweets) => {
    state.oneUserTweets = [...oneUserTweets];
    state.filteredTweets = [...oneUserTweets];
  },
  [SET_ONE_USER_REPLIES]: (state, oneUserReplies) => {
    state.oneUserReplies = [...oneUserReplies];
    state.filteredTweets = [...oneUserReplies];
  },
  [SET_ONE_USER_LIKES]: (state, oneUserLikes) => {
    state.oneUserLikes = [...oneUserLikes];
    state.filteredTweets = [...oneUserLikes];
  },
  [SET_ONE_USER_REPLIES]: (state, oneUserReplies) => {
    state.oneUserReplies = [...oneUserReplies];
    state.filteredTweets = [...oneUserReplies];
  },
  [SET_ONE_USER_LIKES]: (state, oneUserLikes) => {
    state.oneUserLikes = [...oneUserLikes];
    state.filteredTweets = [...oneUserLikes];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};