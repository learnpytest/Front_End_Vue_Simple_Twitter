<template>
  <div class="container">
    <div class="user">
      <div class="sidebar"><Sidebar /></div>
      <div class="main">
        <div class="header">
          <img
            src="./../assets/images/icon_back.png"
            alt=""
            @click="$router.back()"
          />
          <div class="header-info">
            <p>John Doe</p>
            <p>25 <span>推文</span></p>
          </div>
        </div>
        <div class="user-profile">
          <UserProfile />
        </div>
        <tabs class="tabs">
          <tab title="推文"
            ><Tweets :initialShowReplyModal="showReplyModal"
          /></tab>
          <tab class="comments" title="推文與回覆"><Comments /></tab>
          <tab title="喜歡的內容"><Tweets /></tab>
        </tabs>
      </div>
      <div class="popular"><Popular /></div>
    </div>
  </div>
</template>
<script>
import Popular from "../modules/user/Popular.vue";
import Sidebar from "../modules/user/Sidebar.vue";
import UserProfile from "../modules/user/UserProfile.vue";
import Tweets from "../modules/user/Tweets.vue";
import Tabs from "../modules/user/Tabs.vue";
import Tab from "../modules/user/Tab.vue";
import Comments from "../modules/user/Comments.vue";

// import { mapActions } from "vuex";

// import {
//   SET_TWEETS_FILTER_TYPE,
//   GET_ONE_USER_TWEETS,
//   SET_ONE_USER_TWEETS,
// } from "../store/store-types";
export default {
  components: {
    Popular,
    Sidebar,
    UserProfile,
    Tweets,
    Tabs,
    Tab,
    Comments,
  },
  data() {
    // test
    return {
      showReplyModal: false,
    };
  },
  // created() {
  //   this.setTweetsFilterType({
  //     getter: GET_ONE_USER_TWEETS,
  //     setter: SET_ONE_USER_TWEETS,
  //   });
  // },
  // methods: {
  //   ...mapActions({ setTweetsFilterType: SET_TWEETS_FILTER_TYPE }),
  // },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/main.scss";

.header {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid $gray-75;
  padding-left: 15px;
  font-weight: var(--fw-bolder);
  .header-info {
    :nth-child(2) {
      font-size: 13px;
      color: $gray-600;
      font-weight: var(--fw-normal);
    }
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 40px;
  }
  img:hover {
    cursor: pointer;
  }
}
.user {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 100vh;
}
.main {
  width: 42%;
  height: 100%;
  margin: 0 30px;
  border: 1px solid $gray-75;
}

.popular {
  width: 25%;
  height: 100%;
}
.sidebar {
  width: 18%;
}
</style>
