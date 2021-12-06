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
} from "../store-types";

const state = {
  tweetsFilterType: {
    getter: "",
    setter: "",
  },
  allTweets: [],
  oneUserTweets: [],
};
const getters = {
  [GET_TWEETS_FILTER_TYPE]: (state) => state.tweetsFilterType,
  [GET_ALL_TWEETS]: (state) => state.allTweets,
  [GET_ONE_USER_TWEETS]: (state) => state.oneUserTweets,
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};