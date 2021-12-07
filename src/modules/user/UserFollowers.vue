<template>
  <div class="popular-wrapper">
    <div
      class="popular-card"
      v-for="follower in getCurrentUserFollowers"
      :key="follower.followerId"
    >
      <!-- 沒有上傳照片產生空圖 -->
      <img :src="follower.avatar | emptyImage" alt="user avatar" />
      <div class="popular-card_info">
        <p class="user-name">{{ follower.name }}</p>
        <p class="user-info">@{{ follower.account }}</p>
        <p>{{ follower.introduction }}</p>
      </div>
      <div class="follow-btn" v-if="follower.isFollowed">
        <button class="following-btn" @click="cancelFollow">正在跟隨</button>
      </div>
      <div class="follow-btn" v-else>
        <button
          class="follower-btn"
          @click="postFollowship(follower.followerId)"
        >
          跟隨
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { mixinEmptyImage } from "../../utils/mixin";

import {
  GET_CURRENT_USER_FOLLOWERS,
  SET_CURRENT_USER_FOLLOWERS,
  POST_FOLLOWSHIP,
  // DELETE_FOLLOWSHIP
} from "../../store/store-types";
export default {
  name: "Popular",
  mixins: [mixinEmptyImage],
  created() {
    this.setCurrentUserFollowers();
  },
  methods: {
    ...mapActions({
      setCurrentUserFollowers: SET_CURRENT_USER_FOLLOWERS,
      postFollowship: POST_FOLLOWSHIP,
    }),
  },
  computed: {
    ...mapGetters({
      getCurrentUserFollowers: GET_CURRENT_USER_FOLLOWERS,
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/main.scss";
.popular-wrapper {
  background-color: $gray-50;
  border-radius: 10px;
  margin-top: 10px;
  font-weight: var(--fw-bold);
  width: 100%;
}
.popular-header {
  padding: 10px;
}

.popular-card {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 15px;
  border-top: 1px solid $gray-75;
}

.popular-card img {
  width: 50px;
  height: 50px;
}

.popular-card_info {
  font-size: 14px;
  margin-left: 10px;
}

.user-info {
  color: $gray-600;
}

.follow-btn {
  width: 100%;
  text-align: right;
}

.follow-btn button {
  font-weight: var(--fw-bold);
  border-radius: 25px;
  padding: 8px 14px;
}
.following-btn {
  color: $white;
  background-color: $orange-100;
}

.follower-btn {
  background-color: $gray-50;
  color: $orange-100;
  border: 1.5px solid $orange-100;
}
</style>
