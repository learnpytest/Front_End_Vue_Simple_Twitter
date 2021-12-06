<template>
  <!-- todo need to correct all detail for tweets after server provide fulfill tweet data -->
  <div class="tweets-wrapper">
    <div
      class="tweet"
      v-for="(tweet, index) in tweets"
      :key="index"
      @click.stop.prevent="() => $router.push('reply')"
    >
      <div class="user-pic">
        <img src="#" alt="" />
      </div>

      <div class="tweet-info">
        <div class="info">
          <p class="user-name">
            <!-- {{ tweet.User.name }} -->
            <span class="user-id">@{{ tweet.UserId }} • </span
            ><span class="time">{{ tweet.createdAt }}小時</span>
          </p>
        </div>
        <div class="tweet-text">{{ tweet.description }}</div>
        <div class="tweet-buttons-control">
          <div class="tweet-buttons">
            <img
              src="./../../assets/images/icon_reply.svg"
              alt=""
              @click.stop.prevent="handleShowModalClick"
            />
            <!-- todo need backend to add replies data for tweets -->
            <p class="reply-num">{{ tweet.id }}</p>
          </div>
          <div class="tweet-buttons">
            <!-- <img
              id="liked-btn"
              src="./../../assets/images/icon_like_fill.svg"
              alt=""
              @click.stop.prevent="handleLikeButton(tweet.isLiked === 'true')"
              v-if="tweet.isLiked"
            /> -->
            <img
              id="liked-btn"
              src="./../../assets/images/icon_like_fill.svg"
              alt=""
              @click.stop.prevent="handleLikeButton(tweet.isLiked === 'true')"
              v-if="tweet.isLiked"
            />
            <img
              src="./../../assets/images/icon_like.svg"
              alt=""
              @click="handleLikeButton(tweet.isLiked)"
              v-else
            />

            <p class="liked-num" :class="{ liked: tweet.isLiked }">
              <!-- {{ tweet.LikedUsers.length }} -->
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import { GET_TWEETS_FILTER_TYPE } from "../../store/store-types";

export default {
  props: {
    initialShowReplyModal: {
      type: Boolean,
      //test need to set required on true
      // required: true,
    },
  },
  data() {
    return {
      showReplyModal: false,
    };
  },

  created() {
    this.getTweets();
  },
  methods: {
    fetchData() {
      this.showReplyModal = this.initialShowReplyModal;
    },
    handleLikeButton(isLiked) {
      this.tweet = {
        ...this.tweet,
        isLiked: true,
      };
      console.log(isLiked);
      console.log(this.tweet);
    },
    handleShowModalClick() {
      this.showReplyModal = true;
      this.$emit("show-reply-modal");
    },
    getTweets() {
      console.log("dispatch tweets vue");
      this.$store.dispatch(`${this.filterType.setter}`);
    },
  },
  computed: {
    tweets() {
      return this.$store.getters[`${this.filterType.getter}`];
    },
    ...mapGetters({
      // tweets: GET_ALL_TWEETS,
      filterType: GET_TWEETS_FILTER_TYPE,
    }),
  },
  watch: {
    filterType: "getTweets",
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/main.scss";
@import "./../../assets/scss/tweet.scss";
.tweets-wrapper {
  width: 100%;
}

.tweet {
  display: flex;
  padding: 15px 10px 15px 10px;
  font-size: 14px;
  border-bottom: 1px solid $gray-75;
  cursor: pointer;
}
</style>
