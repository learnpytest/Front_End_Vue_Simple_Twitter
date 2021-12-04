<template>
  <div class="container--horizontal">
    <!-- this side bar will need to be replaced with actual one -->
    <div class="sidebar sidebar--admin">
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
          <img
            class="menu__image"
            src="@/assets/images/icon_logout.svg"
            alt=""
          />
          <span>登出</span>
        </div>
      </menu>
    </div>
    <div class="panel--data">
      <div class="panel--data__title">推文清單</div>
      <div class="tweets">
        <!-- todo get real tweets and use v-for to render all tweets then pass id as prop to tweet card to run delete function -->
        <AdminTweet />
      </div>
    </div>
  </div>
</template>

<script>
import AdminTweet from "@/modules/Admin/AdminTweet.vue";
export default {
  name: "AdminMain",
  components: {
    AdminTweet,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils/mixins/_colors.scss";
@import "@/assets/scss/utils/_variables.scss";

.container--horizontal {
  display: flex;
  width: 100%;
}
.sidebar {
  width: 20%;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.panel--data {
  flex: 1;
  &__title {
    height: 3.5rem;
    line-height: 3.5rem;
    min-height: 3rem;
    margin-bottom: 1rem;
    padding: 0 1.6rem;
    font-size: 1.3rem;
    font-weight: var(--fw-bold);
    @include grays(color, g-900);
    border-bottom: 1px solid #e6ecf0;
    border-color: var(--g-75);
  }
  .tweets {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
  }
}
router-link {
  @include theme-colors(color, primary);
}
.menu {
  @include grays(color, g-900);

  font-weight: var(--fw-bold);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  &__icon {
    width: 1.3rem;
    height: 1.3rem;
    background-image: url("../assets/images/icon_index.svg");
    background-size: cover;
  }

  &__item {
    display: flex;
    gap: 1.4rem;
    align-items: flex-end;
    padding: 0.1rem;

    &.active {
      .menu__icon {
        background-image: url("../assets/images/icon_index_vector.svg");
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
