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
      <div class="text-box">
        <div class="user-info">
          <!-- 沒有上傳照片產生空圖 -->
          <img
            class="user-pic"
            :src="getCurrentUser.avatar | emptyImage"
            alt=""
          />
        </div>
        <div class="text-area">
          <textarea
            class="form-control"
            rows="3"
            v-model="text"
            maxlength="140"
            placeholder="有什麽新鮮事？"
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
import { mapGetters } from "vuex";
import { GET_CURRENT_USER } from "../../store/store-types";
import { mixinEmptyImage } from "../../utils/mixin";

export default {
  mixins: [mixinEmptyImage],
  props: {
    initialShowModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showModal: "",
      text: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.showModal = this.initialShowModal;
    },
    handleShowModalClick() {
      this.showModal = true;
      this.$emit("show-modal");
    },
  },
  computed: {
    charactersLeft() {
      let char = this.text.length,
        limit = 140;

      return limit - char + " / " + limit + "剩餘字數";
    },
    ...mapGetters({
      getCurrentUser: GET_CURRENT_USER,
    }),
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
  .user-pic {
    margin-right: 10px;
  }
}

.tweet-info p {
  color: $gray-700;
  letter-spacing: 1px;
}
</style>
