<template>
  <div class="mb-24">
    <!-- Floating Action Button For Toggling -->
    <a-button class="fab" shape="circle" @click="chartStore.toggleModal">
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
          <p>{{ $route.params.id }}</p>
          <component :is="item.component" :title="item.i"> </component>
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
import ChartBase from "../components/Charts/ChartBase.vue";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    ChartCreator,
    ChartBase,
  },
  data() {
    return {
      layout: [
        {
          x: 0,
          y: 0,
          w: 4,
          h: 2,
          i: "0",
          component: "ChartBase",
        },
        {
          x: 0,
          y: 2,
          w: 4,
          h: 2,
          i: "1",
          component: "ChartBase",
        },
      ],
    };
  },
  computed: {
    ...mapStores(useChartStore),
  },
  methods: {
    readComponents() {
      var formdata = new FormData();
      formdata.append("dashboardId", this.$route.params.id);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/read-components",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
  },
  created() {
    this.readComponents(); //ASIGN XYHW FROM COMPONENT TO LAYOUT :))))
  },
};
</script>

<style lang="scss"></style>
