<template>
  <div class="tweet">
    <div class="tweet__img">
      <img class="tweet__avatar" src="http://fakeimg.pl/50x50" alt="" />
    </div>
    <div class="tweet__txt">
      <div class="tweet__control">
        <div class="tweet__info">
          <div class="tweet__username">Apple</div>
          <div class="tweet__account">
            @apple<span class="dot">&bull;</span>
          </div>
          <div class="tweet__created">3小時</div>
        </div>
        <div class="tweet__delete">
          <img
            class="filter-orange"
            src="@/assets/images/icon_close_gray.svg"
            alt="delete tweet button"
          />
        </div>
      </div>
      <div class="tweet__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminTweet",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils/mixins/_colors.scss";
@import "@/assets/scss/utils/_variables.scss";

.tweet {
  display: flex;
  gap: 1rem;
  width: 100%;
  &__img {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    margin-top: 0.3rem;
    border-radius: 50%;
    overflow: hidden;
  }
  &__txt {
    flex: 1;
  }
  &__control,
  &__info {
    display: flex;
  }
  &__info {
    align-items: flex-end;
  }
  &__control {
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  &__delete {
    width: 1.5rem;
    height: 1.5rem;
    &:hover {
      .filter-orange {
        filter: invert(35%) sepia(86%) saturate(4434%) hue-rotate(5deg)
          brightness(105%) contrast(106%);
      }
    }
  }

  &__content {
    line-height: 1.5;
    font-weight: var(--fw-normal);
    @include grays(color, g-900);
    // todo leave only 50 words
    overflow: hidden;
    width: 45%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__username {
    font-weight: var(--fw-bold);
    margin-right: 0.5rem;
    @include grays(color, g-900);
  }
  &__account,
  &__created {
    font-size: 0.9rem;
    font-weight: var(--fw-normal);
    @include grays(color, g-600);
    .dot {
      margin: 0 0.3em;
    }
  }
  &__delete {
    cursor: pointer;
  }
}
</style>
