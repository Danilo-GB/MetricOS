<template>
  <div>
    <a-row type="flex">
      <a-col :span="24" class="mb-20"
        ><span class="text-item-header">{{
          $t(`statistics.steps.3.about`)
        }}</span></a-col
      >
      <a-col :span="24" class="mb-20" v-if="!isDataAvailable"
        ><span class="text-item-header">{{
          $t(`statistics.steps.3.waiting-data`)
        }}</span>
      </a-col>
      <div v-else>
        <a-col :span="24">
          <a-input
            :addon-before="$t('statistics.steps.3.title')"
            :placeholder="$t('statistics.steps.3.title')"
            v-model="title"
          />
        </a-col>
        <a-col :span="8">
          <a-input
            :addon-before="$t('statistics.steps.3.prefix')"
            :v-model="prefix"
          >
          </a-input>
        </a-col>
        <a-col :span="8">
          <a-input
            :addon-before="$t('statistics.steps.3.data')"
            :disabled="true"
            :value="selectedDataId"
          >
            <a-select
              slot="addonAfter"
              style="width: 100px"
              v-model="selectedDataId"
            >
              <a-select-option v-for="(key, i) in dataId" :key="i" :value="key">
                {{ key }}
              </a-select-option>
            </a-select>
          </a-input>
        </a-col>
        <a-col :span="8">
          <a-input
            :addon-before="$t('statistics.steps.3.sufix')"
            :v-model="sufix"
          >
          </a-input>
        </a-col>
      </div>
    </a-row>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStcomponentsStore } from "../../store/useStComponentsStore";
export default {
  data() {
    return {
      title: "",
      prefix: "",
      sufix: "",
      dataId: [],
      selectedDataId: "",
    };
  },
  watch: {
    title() {
      this.stcomponentsStore.$patch({
        componentData: {
          title: this.title,
        },
      });
    },
    prefix() {
      this.stcomponentsStore.$patch({
        componentData: {
          prefix: this.prefix,
        },
      });
    },
    sufix() {
      this.stcomponentsStore.$patch({
        componentData: {
          sufix: this.sufix,
        },
      });
    },
    selectedDataId() {
      this.stcomponentsStore.$patch({
        componentData: {
          dataId: this.selectedDataId,
        },
      });
    },
  },
  computed: {
    ...mapStores(useStcomponentsStore),
    isDataAvailable() {
      if (this.stcomponentsStore.componentData.dataQuery != "") {
        this.getData();
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    setSelectors(data) {
      this.dataId = Object.keys(data[0]);
    },
    getData() {
      var formdata = new FormData();
      let stcomponentsStore = this.stcomponentsStore.componentData;
      formdata.append("dataQuery", stcomponentsStore.dataQuery);
      formdata.append("qSelect", stcomponentsStore.qSelect);
      formdata.append("qFrom", stcomponentsStore.qFrom);
      formdata.append("qOrderBy", stcomponentsStore.qOrderBy);
      formdata.append("qOrderByType", stcomponentsStore.qOrderByType);

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
