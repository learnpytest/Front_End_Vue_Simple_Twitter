<template>
  <div class="view--setting">
    <SettingForm>
      <template v-slot:header> 建立你的帳號 </template>
      <template v-slot:button
        ><PrimaryButtonLarge
          class="form__btn"
          @click.native.prevent.stop="register"
          >註冊
        </PrimaryButtonLarge>
      </template>
      <template v-slot:cancel>
        <router-link class="link--login" :to="{ name: 'user-login' }"
          >取消</router-link
        >
      </template>
    </SettingForm>
  </div>
</template>

<script>
import SettingForm from "@/components/SettingForm";
import PrimaryButtonLarge from "@/components/Buttons/PrimaryButtonLarge.vue";
import { mapActions } from "vuex";
import { POST_USER_LOGIN } from "../store/store-types";

export default {
  name: "UserLogin",
  components: {
    SettingForm,
    PrimaryButtonLarge,
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
.view--setting {
  height: 100%;
}
.dot {
  font-weight: var(--fw-normal);
  width: 0.5rem;
  display: inline-block;
  text-align: center;
  color: var(--b-1000);
}
</style>
