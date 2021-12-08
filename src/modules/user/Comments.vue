<template>
  <div class="comment-wrapper">
    <div class="comment" v-for="tweet in tweets" :key="tweet.ReplyID">
      {{ tweet }}
      <div class="user-pic">
        <!-- 沒有上傳照片產生空圖 -->
        <img :src="tweet.User.avatar | emptyImage" alt="" />
      </div>

      <div class="tweet-info">
        <div class="info">
          <p class="user-name">
            {{ tweet.User.name }}
            <span class="user-id">@{{ tweet.User.account }} • </span
            ><span class="time">{{ tweet.createdAt | fromNow }}</span>
          </p>
        </div>
        <p Class="reply-to">
          回覆 <span>@ {{ tweet.Tweet.User.account }}</span>
        </p>
        <div class="tweet-text">
          {{ tweet.comment }}
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
  name: "Comments",
  mixins: [mixinEmptyImage, mixinFromNowFilters],
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
.comment-wrapper {
  width: 100%;
}

.comment {
  display: flex;
  padding: 15px 10px 15px 10px;
  font-size: 14px;
  border-bottom: 1px solid $gray-75;
  cursor: pointer;
}

.reply-to {
  color: $gray-600;
  padding-bottom: 5px;
  span {
    color: $orange-100;
  }
}
</style>
