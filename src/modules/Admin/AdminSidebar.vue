<template>
  <menu class="menu">
    <div class="menu__item menu__item--logo">
      <img
        class="menu__logo"
        src="@/assets/images/Icon_logo_self.png"
        alt="logo"
      />
    </div>
    <router-link class="menu__item" :to="{ name: 'admin-tweet-list' }">
      <span class="menu__icon"></span>
      <span class="menu__txt"> 推文清單 </span>
    </router-link>
    <!-- todo will need to adjust icon with svg to fit different usage case such as hover or active -->
    <router-link class="menu__item" :to="{ name: 'admin-users-list' }">
      <img class="menu__image" src="@/assets/images/icon_user.png" />
      <span class="menu__txt"> 使用者列表 </span>
    </router-link>

    <div class="menu__item menu__action">
      <img class="menu__image" src="@/assets/images/icon_logout.svg" alt="" />
      <span>登出</span>
    </div>
  </menu>
</template>
<script>
export default {
  name: "AdminSidebar",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils/mixins/_colors.scss";
@import "@/assets/scss/utils/_variables.scss";

.menu {
  padding: 0.7rem 0;
  min-width: fit-content;
  width: fit-content;
  margin: 0 auto;
  @include grays(color, g-900);

  font-weight: var(--fw-bold);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  &__icon {
    width: 1.3rem;
    height: 1.3rem;
    background-image: url("../../assets/images/icon_index.svg");
    background-size: cover;
  }

  &__item {
    display: flex;
    gap: 1.4rem;
    align-items: flex-end;
    padding: 0.1rem;

    &.active {
      .menu__icon {
        background-image: url("../../assets/images/icon_index_vector.svg");
      }
      .menu__txt {
        @include theme-colors(color, primary);
      }
    }
    &:hover {
      cursor: pointer;
      color: $orange-200;
      .menu__txt {
        color: $orange-200;
      }
    }
    &--logo {
      margin-bottom: 1.2rem;
    }
  }
  &__logo {
    width: 1.8rem;
    height: 1.8rem;
  }
  &__image {
    width: 1.3rem;
    height: 1.3rem;
  }
  &__txt {
    line-height: 1.2rem;
    height: 1.2rem;
    @include grays(color, g-900);
  }
  &__action {
    margin-top: auto;
  }
}
</style>
