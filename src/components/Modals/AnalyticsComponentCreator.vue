<template>
  <!-- modal -->
  <a-modal
    v-model="stcomponentsStore.isModalOpen"
    :title="$t('modal.header')"
    @cancel="handleCancel"
    centered
    :width="1000"
  >
    <div class="px-10">
      <a-steps :current="stcomponentsStore.currentStep" class="p-5">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <a-row class="steps-content" type="flex" align="middle" justify="center">
        <a-col>
          <keep-alive v-if="stcomponentsStore.isModalOpen">
            <component
              :is="steps[stcomponentsStore.currentStep].component"
              :stepId="stcomponentsStore.currentStep + 1"
            ></component>
          </keep-alive>
        </a-col>
      </a-row>
    </div>
    <template slot="footer">
      <div>
        <a-button
          v-if="stcomponentsStore.currentStep > 0"
          style="margin-left: 8px"
          @click="stcomponentsStore.currentStep--"
        >
          {{ $t("modal.prev") }}
        </a-button>
        <a-button
          v-if="stcomponentsStore.currentStep < steps.length - 1"
          type="primary"
          @click="stcomponentsStore.currentStep++"
        >
          {{ $t("modal.next") }}
        </a-button>
        <a-button
          v-if="stcomponentsStore.currentStep == steps.length - 1"
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
import StTypeSelector from "../Selectors/StTypeSelector.vue";
import StQuerySelector from "../Selectors/StQuerySelector.vue";
import StDataConfirm from "../Selectors/StDataConfirm.vue";
import { mapStores } from "pinia";
import { useStcomponentsStore } from "../../store/useStComponentsStore";

export default {
  components: {
    StTypeSelector,
    StQuerySelector,
    StDataConfirm,
  },
  data() {
    return {
      steps: [
        {
          title: this.$t("statistics.steps.1.name"),
          component: "StTypeSelector",
        },
        {
          title: this.$t("statistics.steps.2.name"),
          component: "StQuerySelector",
        },
        {
          title: this.$t("statistics.steps.3.name"),
          component: "StDataConfirm",
        },
      ],
    };
  },
  computed: {
    ...mapStores(useStcomponentsStore),
  },
  methods: {
    handleDone() {
      this.stcomponentsStore.addComponent();
      this.stcomponentsStore.$patch({ isModalOpen: false, currentStep: 0 });
    },
    handleCancel() {
      this.stcomponentsStore.$patch({ isModalOpen: false, currentStep: 0 });
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
