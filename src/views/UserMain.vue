<template>
  <div class="container">
    <div class="new-tweet-modal" v-if="showModal">
      <NewTweetModal :initialShowModal="showModal" @show-modal="modalToggle" />
    </div>
    <div class="new-tweet-modal" v-if="showReplyModal">
      <ReplyTweetModal
        :initialShowReplyModal="showReplyModal"
        @show-reply-modal="replyModalToggle"
      />
    </div>
    <div class="usermain">
      <div class="sidebar"><Sidebar /></div>
      <div class="main">
        <div class="addtweet">
          <AddTweet :initialShowModal="showModal" @show-modal="modalToggle" />
        </div>

        <div class="tweets">
          <Tweets
            :initialShowReplyModal="showReplyModal"
            @show-reply-modal="replyModalToggle"
          />
        </div>
      </div>
      <div class="popular"><Popular /></div>
    </div>
  </div>
</template>

<script>
// import Sidebar from "../modules/Sidebar.vue";
import AddTweet from "../modules/user/AddTweet.vue";
import Tweets from "../modules/user/Tweets.vue";
import Popular from "../modules/user/Popular.vue";
import Sidebar from "../modules/user/Sidebar.vue";
import NewTweetModal from "../modules/user/NewTweetModal.vue";
import ReplyTweetModal from "../modules/user/ReplyTweetModal.vue";

const dummyData = {
  users: [
    {
      id: 1,
      name: "Jm Malik",
      userId: "@jmmalik",
      userImg: "",
      followings: [
        {
          id: 10,
          name: "Jeff Bezos",
          userId: "@jeffbezos",
          img: "",
          isFollowed: true,
        },
        {
          id: 11,
          name: "Martin Loo",
          userId: "@martinloo",
          img: "",
          isFollowed: true,
        },
        {
          id: 12,
          name: "Zeus",
          userId: "@zeus",
          img: "",
          isFollowed: false,
        },
        {
          id: 13,
          name: "Key",
          userId: "@key",
          img: "",
          isFollowed: true,
        },
      ],
      followers: [
        {
          id: 20,
          name: "Nando",
          userId: "@nando",
          img: "",
          isFollowed: true,
        },
        {
          id: 21,
          name: "Sushi King",
          userId: "@sushiking",
          img: "",
          isFollowed: true,
        },
        {
          id: 22,
          name: "Bawang",
          userId: "@bawang",
          img: "",
          isFollowed: true,
        },
      ],
    },
  ],
};

export default {
  components: {
    AddTweet,
    Tweets,
    Popular,
    Sidebar,
    NewTweetModal,
    ReplyTweetModal,
  },
  data() {
    return {
      showModal: false,
      showReplyModal: false,
      users: [],
    };
  },

  methods: {
    fetchData() {
      const { users, tweets } = dummyData;
      this.users = users;
      this.tweets = tweets;
    },
    modalToggle() {
      if (!this.showModal) {
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },

    replyModalToggle() {
      if (!this.showReplyModal) {
        this.showReplyModal = true;
      } else {
        this.showReplyModal = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/scss/main.scss";
.new-tweet-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 100%;
}
.usermain {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 100vh;
}
.container {
  height: 100%;
}
.sidebar {
  width: 18%;
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
</style>
