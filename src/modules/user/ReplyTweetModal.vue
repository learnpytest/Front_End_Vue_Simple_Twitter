<template>
  <div class="new-tweet-modal">
    <div class="new-text-box">
      <div class="close-btn">
        <button>
          <img
            src="./../../assets/images/icon_close.svg"
            alt=""
            @click="handleShowModalClick"
          />
        </button>
      </div>
      <div class="to-reply-user">
        <div class="to-reply-user_pic">
          <img
            class="user-pic"
            src="./../../assets/images/Photo_user1.png"
            alt=""
          />
          <div class="connecting-line"></div>
        </div>
        <div class="to-reply-user-info">
          <div class="to-reply-user-info_info">
            <p class="to-reply-user-name">
              Apple <span>@apple • </span><span>3 小時</span>
            </p>
          </div>
          <div class="to-reply-user-tweet_text">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
            cillum dolor. Voluptate exercitation incididunt aliquip deserunt
            reprehenderit elit laborum.
          </div>
          <p class="reply-to">回覆給 <span>@apple</span></p>
        </div>
      </div>

      <div class="text-box">
        <div class="user-info">
          <img
            class="user-pic"
            src="./../../assets/images/Photo_user1.png"
            alt=""
          />
        </div>
        <div class="text-area">
          <textarea
            class="form-control"
            rows="3"
            v-model="text"
            placeholder="推你的回覆"
            @submit.stop.prevent="handleTweetSubmit"
          /><span class="limiter">{{ charactersLeft }}</span>
        </div>
      </div>

      <div class="tweet-btn">
        <button>推文</button>
      </div>
    </div>
  </div>
</template>
<script>
// need to take targeted user

export default {
  props: {
    initialShowReplyModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showReplyModal: false,
      text: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.showReplyModal = this.initialShowReplyModal;
    },
    handleShowModalClick() {
      this.showReplyModal = false;
      this.$emit("show-reply-modal");
    },
  },
  computed: {
    charactersLeft() {
      let char = this.text.length,
        limit = 140;

      return limit - char + " / " + limit + "剩餘字數";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./src/assets/scss/main.scss";
.limiter {
  color: $gray-700;
  font-size: 12px;
  font-weight: var(--bold);
  margin-right: 10px;
}
.connecting-line {
  margin: 5px auto;
  border: 1px solid $gray-200;
  height: 60%;
  width: 1px;
  background-color: $gray-200;
}
.reply-to {
  font-size: 12px;
  margin-top: 10px;
  color: $gray-600;
  span {
    color: $orange-100;
  }
}

.to-reply-user-name {
  font-weight: var(--fw-bold);
  font-size: 15px;
  margin-bottom: 5px;
  span {
    color: $gray-600;
    font-weight: var(--fw-normal);
  }
}
.to-reply-user-tweet_text {
  font-weight: var(--fw-thin);
}

.to-reply-user {
  display: flex;
  flex-flow: row nowrap;
  padding: 10px;
}
.to-reply-user_pic {
  width: 10%;
  margin-right: 7px;
  img {
    width: 50px;
    height: 50px;
  }
}

.new-tweet-modal {
  background-color: rgba(28, 28, 28, 0.5);
  height: 100%;
  padding-top: 50px;
}

.text-area {
  width: 90%;
  text-align: right;
  textarea {
    border: 0px;
    min-height: 150px;
    resize: none;
    width: 100%;
    margin-top: 10px;
    font-family: "Noto Sans TC", sans-serif;
    font-size: 15px;
  }
}

.new-text-box {
  width: 43%;
  margin: 0 auto;
  background-color: $white;
  border-radius: 10px;
}
.close-btn {
  border-bottom: 1px solid $gray-75;
  padding: 10px;
}
.text-box {
  border-top: 0px;
  padding: 10px;
  display: flex;
  flex-flow: row nowrap;
}

.tweet-btn {
  text-align: right;
  padding: 10px;
}

.tweet-btn button {
  background-color: $orange-100;
  // font-weight: var(--fw-normal);
  color: $white;
  font-size: 16px;
  width: 65px;
  height: 36px;
  border-radius: 50px;
}

.user-info {
  color: $gray-700;
  width: 10%;
  img {
    max-width: 50px;
    max-height: 50px;
  }
}

.tweet-info p {
  color: $gray-700;
  letter-spacing: 1px;
}
</style>
