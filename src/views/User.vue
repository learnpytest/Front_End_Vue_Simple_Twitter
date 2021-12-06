<template>
  <div class="container">
    <div class="user-edit-modal" v-if="showEditModal">
      <UserEditModal
        :initialEditModal="showEditModal"
        @show-edit-modal="editModalToggle"
      />
    </div>
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
            <!-- <p>John Doe</p>
            <p>25 <span>推文</span></p> -->
            <p>{{ getCurrentUser.name }}</p>
            <p>25 <span>推文</span></p>
          </div>
        </div>
        <div class="user-profile">
          <UserProfile
            :initialEditModal="showEditModal"
            @show-edit-modal="editModalToggle"
          />
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
import UserEditModal from "../modules/user/UserEditModal.vue";

import { mapGetters } from "vuex";

import {
  GET_CURRENT_USER,
  // SET_ONE_USER_TWEETS,
} from "../store/store-types";
export default {
  components: {
    Popular,
    Sidebar,
    UserProfile,
    Tweets,
    Tabs,
    Tab,
    Comments,
    UserEditModal,
  },
  data() {
    return {
      showEditModal: false,
      showReplyModal: false,
    };
  },
  methods: {
    editModalToggle() {
      if (!this.showEditModal) {
        this.showEditModal = true;
      } else {
        this.showEditModal = false;
      }
    },
  },

  computed: {
    ...mapGetters({
      getCurrentUser: GET_CURRENT_USER,
    }),
  },
  computed: {
    ...mapGetters({
      getCurrentUser: GET_CURRENT_USER,
    }),
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

.user-edit-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 100%;
}
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
