<!-- 
	This is an empty page for layout demonstrations, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div class="mb-24">
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
          <!-- Widget 1 Card -->
          <WidgetCounter
            v-if="item.i === '1'"
            title="hillow hillow"
            :value="item.i"
            prefix=""
            suffix=""
            icon='<a-icon type="appstore" theme="filled" />'
          ></WidgetCounter>

          <CardLineChart v-if="item.i === '2'"></CardLineChart>
          <!-- / Widget 1 Card -->
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import WidgetCounter from "../components/Widgets/WidgetCounter";
import CardLineChart from "../components/Cards/CardLineChart";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    WidgetCounter,
    CardLineChart,
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 4, h: 2, i: "1" },
        { x: 0, y: 2, w: 4, h: 8, i: "2" },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
