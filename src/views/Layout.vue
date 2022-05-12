<template>
  <div class="mb-24">
    <!-- Floating Action Button For Toggling -->
    <a-button class="fab" shape="circle" @click="testStore">
      <a-icon type="plus" />
    </a-button>
    <chart-creator></chart-creator>
    <!-- / Floating Action Button For Toggling -->
    <div class="border-gray-6">
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :margin="[10, 10]"
      >
        <grid-item
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
        >
          <a-button type="primary" @click="increment"> add ++ </a-button>
          <span>{{ chartStore.counter }}</span>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useChartStore } from "../store/useChartStore";
import VueGridLayout from "vue-grid-layout";
import ChartCreator from "../components/Modals/ChartCreator.vue";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    ChartCreator,
  },
  data() {
    return {
      layout: [{ x: 0, y: 0, w: 4, h: 2, i: "1" }],
    };
  },
  computed: {
    ...mapStores(useChartStore),
  },
  methods: {
    testStore() {
      console.log(this.chartStore);
    },
    increment() {
      this.chartStore.$patch({
        counter: 10,
      });
    },
  },
};
</script>

<style lang="scss"></style>
