// import axios from "axios";

import {
  GET_ALL_TWEETS,
  SET_ALL_TWEETS
} from "../store-types";

const state = {
  allTweets: [],
};
const getters = {
  [GET_ALL_TWEETS]: (state) => state.allTweets,
};
const actions = {
  [SET_ALL_TWEETS]: async ({
    commit
  }) => {
    // todo send api to get reponse of all tweets and pass tweets to mutation to change state all the tweets
    // start
    // const response = await axios.get("https://fakestoreapi.com/products");
    // const {data, status, statusText} = response
    // if (status !== 'success' || data.status !== 'success') throw new Error('statusText')
    // commit(SET_ALL_TWEETS, allTweets);
    // end
    commit(SET_ALL_TWEETS);
  },
};
const mutations = {
  [SET_ALL_TWEETS]: (state, allTweets) => {
    state.allTweets = {
      ...state.allTweets,
      ...allTweets,
    };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};