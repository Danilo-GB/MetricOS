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
        :layout="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :margin="[10, 10]"
      >
        <grid-item
          v-for="item in layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          @moved="moveComponent"
          @resized="resizeComponent"
        >
          <div class="grid-chart-item">
            <apexchart
              :options="chartOptions"
              :series="series"
              :height="(item.h * 100) / 3 + 'px'"
              :width="(item.w / 12) * $el.clientWidth - 20 + 'px'"
            ></apexchart>
          </div>
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
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    ChartCreator,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      layout: [],
    };
  },
  computed: {
    ...mapStores(useChartStore),

    series() {
      return [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: "line",
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Product Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      };
    },
  },
  methods: {
    handleTest(val) {
      console.log(val.clientWidth);
    },
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
        .then((result) => (this.layout = JSON.parse(result)))
        .then(() => {
          let length = this.layout.length;
          this.chartStore.$patch({
            layout: {
              x: 0,
              y: Math.max(...this.layout.map((component) => component.y)),
              w: 7,
              h: 7,
              i: this.layout[length - 1].i + 1,
              parent: this.$route.params.id,
            },
          });
        })
        .catch((error) => console.log("error", error));
    },

    moveComponent(i, newX, newY) {
      var formdata = new FormData();
      formdata.append("parentId", this.$route.params.id);
      formdata.append("i", i);
      formdata.append("newX", newX);
      formdata.append("newY", newY);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/move-component",
        requestOptions
      ).catch((error) => console.log("error", error));
    },
    resizeComponent(i, newH, newW) {
      var formdata = new FormData();
      formdata.append("parentId", this.$route.params.id);
      formdata.append("i", i);
      formdata.append("newH", newH);
      formdata.append("newW", newW);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/resize-component",
        requestOptions
      ).catch((error) => console.log("error", error));
    },
  },

  created() {
    this.readComponents();
  },
};
</script>

<style>
.grid-chart-item {
  touch-action: none;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
}
</style>
