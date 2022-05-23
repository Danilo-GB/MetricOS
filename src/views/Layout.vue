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
        :layout="chartStore.layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :margin="[10, 10]"
      >
        <grid-item
          v-for="item in chartStore.layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          @moved="moveComponent"
          @resized="resizeComponent"
          drag-allow-from=".vue-draggable-handle"
          drag-ignore-from=".no-drag"
          style="touch-action: none"
          class="grid-chart-item"
        >
          <div>
            <div class="vue-draggable-handle"></div>
            <apexchart
              class="no-drag"
              v-if="item.loaded && item.component == 'chart'"
              :options="{
                chart: {
                  type: item.type,
                  zoom: {
                    enabled: item.zoom,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                title: {
                  text: item.title,
                  align: 'left',
                },
                xaxis: {
                  categories: item.xLabels,
                },
                noData: {
                  text: 'Loading...',
                },
              }"
              :series="[{ data: item.yData, name: '' }]"
              :height="(item.h * 100) / 3 + 'px'"
              :width="(item.w / 12) * $el.clientWidth - 30 + 'px'"
            ></apexchart>
            <a-card
              v-if="item.component == 'text'"
              :bordered="false"
              class="card-profile-head mt-10"
            >
              <template #title>
                <a-row type="flex" align="middle">
                  <a-col :span="24" :md="12" class="col-info">
                    <a-avatar
                      :size="74"
                      shape="square"
                      src="https://img.freepik.com/vector-gratis/flat-tiny-people-comunicacion-concepto-socio-discusion-proyectos-empresariales_513217-78.jpg?t=st=1653061709~exp=1653062309~hmac=bd231a1a48c8fb86909b3823473bc2edf372c034ced64de075968637f694e656&w=740"
                    />
                    <div class="avatar-info">
                      <h4 class="font-semibold m-0">
                        {{ $t("demostration") }}
                      </h4>
                    </div>
                  </a-col>
                </a-row>
              </template>
            </a-card>
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import VueApexCharts from "vue-apexcharts";
import VueGridLayout from "vue-grid-layout";
import { useChartStore } from "../store/useChartStore";
import ChartCreator from "../components/Modals/ChartCreator.vue";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    ChartCreator,
    apexchart: VueApexCharts,
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useChartStore),
  },
  methods: {
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
  mounted() {
    this.chartStore.readComponents(this.$route.params.id);
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
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  padding: 0 8px 8px 0;
  background-origin: content-box;
  background-color: rgb(0, 195, 255);
  box-sizing: border-box;
  border-radius: 0 0 20px;
  cursor: pointer;
}
.vue-grid-item.vue-grid-placeholder {
  background: none;
}
</style>
