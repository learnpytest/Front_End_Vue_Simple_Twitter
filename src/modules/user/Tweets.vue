<template>
  <!-- todo need to correct all detail for tweets after server provide fulfill tweet data -->
  <div class="tweets-wrapper">
    <div
      class="tweet"
      v-for="tweet in tweets"
      :key="tweet.id"
      @click.stop.prevent="() => $router.push('reply')"
    >
      <div class="user-pic">
        <!-- 當前使用者是第一層的User -->
        <img :src="tweet.User.avatar | emptyImage" alt="" />
      </div>

      <div class="tweet-info">
        <div class="info">
          <p class="user-name">
            <!-- 當前使用者是第一層的User -->
            {{ tweet.User.name }}
            <span class="user-id">@{{ tweet.User.account }} • </span
            ><span class="time">{{ tweet.createdAt | fromNow }}</span>
          </p>
        </div>
        <!-- 當前tweet是第一層直接選取資料 -->
        <div class="tweet-text">{{ tweet.description }}</div>
        <div class="tweet-buttons-control">
          <div class="tweet-buttons">
            <img
              src="./../../assets/images/icon_reply.svg"
              alt=""
              @click.stop.prevent="handleShowModalClick"
            />

            <p class="reply-num">
              {{ tweet.repliesCount || tweet.RepliesCount }}
            </p>
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
              {{ tweet.likesCount || tweet.LikesCount }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import { GET_FILLTERED_TWEETS } from "../../store/store-types";

import { mixinEmptyImage, mixinFromNowFilters } from "../../utils/mixin";

export default {
  mixins: [mixinEmptyImage, mixinFromNowFilters],
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
  },
  computed: {
    ...mapGetters({
      tweets: GET_FILLTERED_TWEETS,
    }),
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
