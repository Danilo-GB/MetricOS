<template>
  <div>
    <a-row type="flex" align="middle" justify="space-between">
      <a-col :span="24" class="mb-20"
        ><span class="text-item-header">{{
          $t(`statistics.steps.1.about`)
        }}</span></a-col
      >
      <a-col v-for="(type, index) in AvailableTypes" :key="index">
        <a-card class="chart-card mb-10">
          <div>{{ type.title }}</div>
          <template slot="actions" class="ant-card-actions">
            <a-button
              v-if="typeSelected !== index"
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
    </a-row>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStcomponentsStore } from "../../store/useStComponentsStore";

export default {
  props: {
    stepId: {
      type: Number,
      default: "",
    },
  },
  data() {
    return {
      typeSelected: 0,
      AvailableTypes: [
        {
          title: this.$t("stats.min"),
        },
        {
          title: this.$t("stats.max"),
        },
        {
          title: this.$t("stats.sum"),
        },
        {
          title: this.$t("stats.product"),
        },
        {
          title: this.$t("stats.mean"),
        },
        {
          title: this.$t("stats.median"),
        },
        {
          title: this.$t("stats.variance"),
        },
        {
          title: this.$t("stats.standardDeviation"),
        },
      ],
    };
  },
  computed: {
    ...mapStores(useStcomponentsStore),
  },
  methods: {
    setChartType(id) {
      this.typeSelected = id;
      this.stcomponentsStore.setChartType(id);
    },
    setChartZoom(checked) {
      this.stcomponentsStore.setChartZoom(checked);
    },
  },
};
</script>

<style>
.chart-card {
  width: 200px;
}
</style>
