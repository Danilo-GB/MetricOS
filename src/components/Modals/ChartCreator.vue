<template>
  <!-- modal -->
  <a-modal
    v-model="createNewComponent"
    title="Vertically centered modal dialog"
    @cancel="handleCancel"
    centered
  >
    <div>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <keep-alive v-if="createNewComponent">
          <component :is="steps[current].component"></component>
        </keep-alive>
      </div>
    </div>
    <template slot="footer">
      <div class="steps-action">
        <a-button
          v-if="current > 0"
          style="margin-left: 8px"
          @click="current--"
        >
          Previous
        </a-button>
        <a-button
          v-if="current < steps.length - 1"
          type="primary"
          @click="current++"
        >
          Next
        </a-button>
        <a-button
          v-if="current == steps.length - 1"
          key="submit"
          type="primary"
          @click="handleDone"
        >
          Done
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script>
import ChartSelector from "../Selectors/ChartSelector.vue";
import QuerySelector from "../Selectors/QuerySelector.vue";
import DataConfirm from "../Selectors/DataConfirm.vue";
export default {
  components: {
    ChartSelector,
    QuerySelector,
    DataConfirm,
  },
  props: {
    createNewComponent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "First",
          component: "ChartSelector",
        },
        {
          title: "Second",
          component: "QuerySelector",
        },
        {
          title: "Last",
          component: "DataConfirm",
        },
      ],
    };
  },
  methods: {
    switchComponentCreation() {
      this.$emit("onChange");
    },
    handleDone() {
      this.current = 0;
      this.switchComponentCreation();
    },
    handleCancel() {
      this.current = 0;
      this.switchComponentCreation();
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
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
