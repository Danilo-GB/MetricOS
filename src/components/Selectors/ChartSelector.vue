<template>
  <div>
    <a-row type="flex" align="middle" justify="space-between">
      <a-col :span="24" class="mb-20"
        ><span class="text-item-header">{{
          $t(`modal.steps.1.about`)
        }}</span></a-col
      >
      <a-col v-for="(chart, index) in AvailableCharts" :key="index">
        <a-card class="chart-card">
          <img slot="cover" :alt="chart.title" :src="chart.src" />
          <div>{{ chart.title }}</div>
          <template slot="actions" class="ant-card-actions">
            <a-button
              v-if="chartSelected !== index"
              class="ant-tag-muted"
              @click="setChartType(index)"
              >{{ $t("button.select") }}</a-button
            >
            <a-button v-else @click="setChartType(index)">{{
              $t("button.selected")
            }}</a-button>
          </template>
        </a-card>
      </a-col>
      <a-col :span="24" class="my-20"
        ><span class="text-item-header">{{
          $t(`modal.steps.1.zoom`)
        }}</span></a-col
      >
      <a-col :span="24">
        <a-switch :checked="chartStore.chartData.zoom" @change="setChartZoom">
          <a-icon slot="checkedChildren" type="check" />
          <a-icon slot="unCheckedChildren" type="close" />
        </a-switch>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useChartStore } from "../../store/useChartStore";
export default {
  props: {
    stepId: {
      type: Number,
      default: "",
    },
  },
  data() {
    return {
      chartSelected: 0,
      AvailableCharts: [
        {
          title: this.$t("chart.line.basic"),
          src: "images/charts/line/basic-line-chart.svg",
        },
        {
          title: this.$t("chart.area.basic"),
          src: "images/charts/area/basic-area-chart.svg",
        },
        {
          title: this.$t("chart.column.basic"),
          src: "images/charts/column/basic-bar-chart-column-chart.svg",
        },
      ],
    };
  },
  computed: {
    ...mapStores(useChartStore),
  },
  methods: {
    setChartType(id) {
      this.chartSelected = id;
      this.chartStore.setChartType(id);
    },
    setChartZoom(checked) {
      this.chartStore.setChartZoom(checked);
    },
  },
};
</script>

<style>
.chart-card {
  width: 200px;
}
</style>
