<template lang="html">
  <div>
    <ul class="tabs__header">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="{ tab__selected: index == selectedIndex }"
        @click.stop.prevent="selectTab(index)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
import {
  GET_CURRENT_USER,
  // GET_ONE_USER_TWEETS,
  // GET_ONE_USER_REPLIES,
  // GET_ONE_USER_LIKES,
  SET_ONE_USER_TWEETS,
  SET_ONE_USER_REPLIES,
  SET_ONE_USER_LIKES,
} from "../../store/store-types";

export default {
  data() {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: [], // all of the tabs
    };
  },
  created() {
    this.tabs = this.$children;
  },
  mounted() {
    this.selectTab(0);
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i;
      // select tabs will set the filter type to decide what tweets to render

      switch (i) {
        case 0:
          this.$store.dispatch(SET_ONE_USER_TWEETS, this.userId);
          break;
        case 1:
          this.$store.dispatch(SET_ONE_USER_REPLIES, this.userId);

          break;
        case 2:
          this.$store.dispatch(SET_ONE_USER_LIKES, this.userId);
          break;
      }

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });
    },
  },
  computed: {
    userId() {
      return this.$store.getters[GET_CURRENT_USER].id;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./src/assets/scss/main.scss";
ul.tabs__header {
  display: block;
  list-style: none;
  border-bottom: 1px solid $gray-75;
}
li {
  font-size: 13px;
  padding: 30px 35px 15px 35px;
  font-weight: var(--fw-bold);
  color: $gray-600;
  display: inline-block;
  cursor: pointer;
}
.tab__selected {
  border-bottom: 2.5px solid $orange-100;
  color: $orange-100;
}
</style>
