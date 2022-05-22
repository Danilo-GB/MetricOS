<template>
  <div>
    <a-row type="flex">
      <a-col :span="24" class="mb-20"
        ><span class="text-item-header">{{
          $t(`modal.steps.3.about`)
        }}</span></a-col
      >
      <a-col :span="24" class="mb-20" v-if="!isDataAvailable"
        ><span class="text-item-header">{{
          $t(`modal.steps.3.waiting-data`)
        }}</span>
      </a-col>
      <div v-else>
        <a-col :span="24">
          <a-input
            :addon-before="$t('chartProperties.title')"
            :placeholder="$t('chartProperties.title')"
            v-model="chartTitle"
          />
        </a-col>

        <a-col :span="12">
          <a-input
            :addon-before="$t('chartProperties.xaxis')"
            :disabled="true"
            :value="selectedXaxis"
          >
            <a-select
              slot="addonAfter"
              style="width: 100px"
              v-model="selectedXaxis"
            >
              <a-select-option v-for="(key, i) in xaxis" :key="i" :value="key">
                {{ key }}
              </a-select-option>
            </a-select>
          </a-input>
        </a-col>
        <a-col :span="12">
          <a-input
            :addon-before="$t('chartProperties.yaxis')"
            :disabled="true"
            :value="selectedYaxis"
          >
            <a-select
              slot="addonAfter"
              style="width: 100px"
              v-model="selectedYaxis"
            >
              <a-select-option v-for="(key, i) in xaxis" :key="i" :value="key">
                {{ key }}
              </a-select-option>
            </a-select>
          </a-input>
        </a-col>
      </div>
    </a-row>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useChartStore } from "../../store/useChartStore";
export default {
  data() {
    return {
      chartTitle: "",
      xaxis: [],
      yaxis: [],
      selectedXaxis: "",
      selectedYaxis: "",
    };
  },
  watch: {
    chartTitle() {
      this.chartStore.$patch({
        chartData: {
          title: this.chartTitle,
        },
      });
    },
    selectedXaxis() {
      this.chartStore.$patch({
        chartData: {
          xaxis: this.selectedXaxis,
        },
      });
    },
    selectedYaxis() {
      this.chartStore.$patch({
        chartData: {
          yaxis: this.selectedYaxis,
        },
      });
    },
  },
  computed: {
    ...mapStores(useChartStore),
    isDataAvailable() {
      if (this.chartStore.chartData.dataQuery != "") {
        this.getData();
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    setSelectors(data) {
      this.xaxis = Object.keys(data[0]);
      this.yaxis = Object.keys(data[0]);
    },
    getData() {
      var formdata = new FormData();
      formdata.append("dataQuery", this.chartStore.chartData.dataQuery);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/query",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          this.setSelectors(JSON.parse(result));
        });
    },
  },
};
</script>

<style></style>
