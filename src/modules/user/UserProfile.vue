<template>
  <div class="profile-wrapper">
    <!-- todo 沒有cover空圖 -->
    <img :src="getCurrentUser.cover" alt="" class="background-pic" />
    <div class="profile-pic">
      <img :src="getCurrentUser.avatar" alt="" />
      <button @click="handleShowModalClick">編輯個人資料</button>
    </div>
    <div class="profile-details">
      <p class="profile-name">{{ getCurrentUser.name }}</p>
      <p class="profile-id">@{{ getCurrentUser.account }}</p>
      <p class="description">
        {{ getCurrentUser.introduction }}
      </p>
      <!-- todo api 沒有跟隨者與跟隨中使用者 -->
      <p class="profile-follow">34個<span>跟隨中</span></p>
      <p class="profile-follow">59位<span>跟隨者</span></p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { GET_CURRENT_USER } from "../../store/store-types";

export default {
  props: {
    initialEditModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showEditModal: false,
      text: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.showEditModal = this.initialEditModal;
    },
    handleShowModalClick() {
      this.showEditModal = false;
      this.$emit("show-edit-modal");
    },
  },
  computed: {
    ...mapGetters({
      getCurrentUser: GET_CURRENT_USER,
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "./src/assets/scss/main.scss";
.background-pic {
  max-width: auto;
  height: 170px;
  object-fit: cover;
}

.profile-pic {
  position: relative;
  text-align: right;
  padding: 10px;
  img {
    position: absolute;
    width: 140px;
    height: 140px;
    top: -70px;
    left: 10px;
  }
  button {
    font-weight: var(--fw-bold);
    border-radius: 25px;
    padding: 8px 14px;
    color: $orange-100;
    border: 1.5px solid $orange-100;
  }
}
.profile-details {
  padding: 10px;
  margin-top: 15px;
  .profile-name {
    font-weight: var(--fw-bolder);
    font-size: 18px;
  }
  .profile-id {
    font-size: 15px;
    color: $gray-600;
  }
  .description {
    margin: 10px 0;
  }
  .profile-follow {
    display: inline-block;
    font-size: 14px;
    margin-right: 20px;
    span {
      color: $gray-600;
      margin-left: 2px;
    }
  }
}
</style>
