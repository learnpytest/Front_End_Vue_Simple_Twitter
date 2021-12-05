<template>
  <div class="view--setting">
    <div class="sidebar">
      <Sidebar />
    </div>
    <AccountForm class="form">
      <template v-slot:title>
        <div class="to-left">帳號設定</div>
      </template>
      <template v-slot:button>
        <div class="to-right">
          <PrimaryButtonSmall
            class="form__btn"
            @click.native.prevent.stop="saveUserSetting"
            >儲存
          </PrimaryButtonSmall>
        </div>
      </template>
    </AccountForm>
  </div>
</template>

<script>
import AccountForm from "@/components/AccountForm";
import PrimaryButtonSmall from "@/components/Buttons/PrimaryButtonSmall.vue";
import { mapActions } from "vuex";
import { POST_USER_LOGIN } from "../store/store-types";
import Sidebar from "../modules/user/Sidebar.vue";

export default {
  name: "UserLogin",
  components: {
    AccountForm,
    PrimaryButtonSmall,
    Sidebar,
  },
  methods: {
    register() {
      this.postUserLogin();
    },
    ...mapActions({
      postUserLogin: POST_USER_LOGIN,
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/utils/_variables.scss";
@import "@/assets/scss/utils/mixins/_colors.scss";

.view--setting {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 100%;
}
.sidebar {
  height: 100vh;
  width: 18%;
}
.form {
  height: 100vh;

  margin: 0;
  flex: 1;
}
.to-right {
  width: 540px;
  max-width: 70%;
  display: flex;
  justify-content: flex-end;
}
.to-left {
  @include grays(color, g-900);
  font-weight: var(--fw-bold);
}

.form__btn {
  font-weight: var(--fw-bold);
}
</style>
