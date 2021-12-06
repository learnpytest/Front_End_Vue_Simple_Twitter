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
import { mapActions } from "vuex";

import {
  SET_TWEETS_FILTER_TYPE,
  GET_ONE_USER_TWEETS,
  SET_ONE_USER_TWEETS,
  GET_ONE_USER_REPLIES,
  SET_ONE_USER_REPLIES,
  GET_ONE_USER_LIKES,
  SET_ONE_USER_LIKES,
} from "../../store/store-types";

export default {
  data() {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: [], // all of the tabs
      filterType: {},
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
          this.filterType = {
            getter: GET_ONE_USER_TWEETS,
            setter: SET_ONE_USER_TWEETS,
          };
          break;
        case 1:
          this.filterType = {
            getter: GET_ONE_USER_REPLIES,
            setter: SET_ONE_USER_REPLIES,
          };
          break;
        case 2:
          this.filterType = {
            getter: GET_ONE_USER_LIKES,
            setter: SET_ONE_USER_LIKES,
          };
          break;
      }
      this.setTweetsFilterType(this.filterType);

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });
    },
    ...mapActions({ setTweetsFilterType: SET_TWEETS_FILTER_TYPE }),
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
