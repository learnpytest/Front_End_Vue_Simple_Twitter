<template>
  <div class="popular-wrapper">
    <div class="popular-header">Popular</div>
    <div class="popular-card" v-for="user in getTopUsers" :key="user.id">
      <!-- todo user avatar可以產生空圖 -->
      <img :src="user.avatar" alt="user avatar" />
      <div class="popular-card_info">
        <p class="user-name">{{ user.name }}</p>
        <p class="user-info">@{{ user.account }}</p>
      </div>
      <div class="follow-btn" v-if="user.isFollowed">
        <button class="following-btn">正在跟隨</button>
      </div>
      <div class="follow-btn" v-else>
        <button class="follower-btn">跟隨</button>
      </div>
    </div>
    <!-- <div class="popular-card">
      <img src="./../../assets/images/Photo_user1.png" alt="" />
      <div class="popular-card_info">
        <p class="user-name">Pizza Hut</p>
        <p class="user-info">@pizzahut</p>
      </div>
      <div class="follow-btn">
        <button class="follower-btn">跟隨</button>
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import { GET_TOP_USERS, SET_TOP_USERS } from "../../store/store-types";
export default {
  name: "Popular",
  created() {
    this.setTopUsers();
  },
  methods: {
    ...mapActions({
      setTopUsers: SET_TOP_USERS,
    }),
  },
  computed: {
    ...mapGetters({
      getTopUsers: GET_TOP_USERS,
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
