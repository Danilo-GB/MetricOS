<!-- 
	This is an empty page for layout demonstrations, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div class="mb-24">
    <div class="border-gray-6">
      <a-modal
        v-model="modal2Visible"
        title="Vertically centered modal dialog"
        centered
        @ok="() => (modal2Visible = false)"
      >
        <p>some contents...</p>
        <input type="text" v-model="modalInput" />
      </a-modal>
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
          <a-button type="primary" @click="() => (modal2Visible = true)">
            Vertically centered modal dialog
          </a-button>
          <span>{{ modalInput }}</span>
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
      layout: [{ x: 0, y: 0, w: 4, h: 2, i: "1" }],

      modal2Visible: false,
      modalInput: "",
    };
  },
};
</script>

<style lang="scss"></style>
