<template>
  <!-- modal -->
  <a-modal
    v-model="chartStore.isModalOpen"
    :title="$t('modal.header')"
    @cancel="handleCancel"
    centered
    :width="800"
  >
    <div class="px-10">
      <a-steps :current="chartStore.currentStep" class="p-5">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <a-row class="steps-content" type="flex" align="middle" justify="center">
        <a-col>
          <keep-alive v-if="chartStore.isModalOpen">
            <component
              :is="steps[chartStore.currentStep].component"
              :stepId="chartStore.currentStep + 1"
            ></component>
          </keep-alive>
        </a-col>
      </a-row>
    </div>
    <template slot="footer">
      <div>
        <a-button
          v-if="chartStore.currentStep > 0"
          style="margin-left: 8px"
          @click="chartStore.currentStep--"
        >
          {{ $t("modal.prev") }}
        </a-button>
        <a-button
          v-if="chartStore.currentStep < steps.length - 1"
          type="primary"
          @click="chartStore.currentStep++"
        >
          {{ $t("modal.next") }}
        </a-button>
        <a-button
          v-if="chartStore.currentStep == steps.length - 1"
          key="submit"
          type="primary"
          @click="handleDone"
        >
          {{ $t("modal.done") }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script>
import ChartSelector from "../Selectors/ChartSelector.vue";
import QuerySelector from "../Selectors/QuerySelector.vue";
import DataConfirm from "../Selectors/DataConfirm.vue";
import { mapStores } from "pinia";
import { useChartStore } from "../../store/useChartStore";

export default {
  components: {
    ChartSelector,
    QuerySelector,
    DataConfirm,
  },
  data() {
    return {
      steps: [
        {
          title: this.$t("modal.steps.1.name"),
          component: "ChartSelector",
        },
        {
          title: this.$t("modal.steps.2.name"),
          component: "QuerySelector",
        },
        {
          title: this.$t("modal.steps.3.name"),
          component: "DataConfirm",
        },
      ],
    };
  },
  computed: {
    ...mapStores(useChartStore),
  },
  methods: {
    handleDone() {
      this.chartStore.addComponent();
      this.chartStore.$patch({ isModalOpen: false, currentStep: 0 });
    },
    handleCancel() {
      this.chartStore.$patch({ isModalOpen: false, currentStep: 0 });
    },
  },
};
</script>

<style>
.steps-content {
  margin-top: 16px;
  border: 2px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding: 10px;
}
</style>
