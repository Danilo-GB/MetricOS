<template>
  <div>
    <a-row type="flex" align="middle" justify="space-between">
      <a-col :span="24" class="mb-20"
        ><span class="text-item-header">{{ title }}</span></a-col
      >
      <a-col v-for="(chart, index) in AvailableCharts" :key="index">
        <a-card hoverable style="width: 200px" class="mx-5">
          <img slot="cover" :alt="chart.title" :src="chart.src" />
          <div>{{ chart.title }}</div>
          <template slot="actions" class="ant-card-actions">
            <a-button>{{ $t("button.select") }}</a-button>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useChartStore } from "../../store/useChartStore";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
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
};
</script>

<style></style>
