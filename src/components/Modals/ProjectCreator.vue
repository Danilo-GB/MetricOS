<template>
  <!-- modal -->
  <a-modal
    v-model="dashStore.isModalOpen"
    :title="$t('modal.header')"
    @cancel="resetData"
    centered
    :width="800"
  >
    <div class="px-10">
      <a-steps :current="dashStore.currentStep" class="p-5">
        <a-step :title="$t('modal.dashboard.title')" />
      </a-steps>
      <a-row class="steps-content" type="flex" align="middle" justify="center">
        <a-col>
          <keep-alive v-if="dashStore.isModalOpen">
            <div>
              <a-row type="flex" align="middle" justify="space-around">
                <a-col :span="12">
                  <a-row class="mb-40">
                    <a-col :span="24" class="mb-20"
                      ><span class="text-item-header">{{
                        $t(`modal.dashboard.about`)
                      }}</span></a-col
                    >
                    <a-col :span="24">
                      <a-input
                        v-model="projectName"
                        :addon-before="$t('modal.dashboard.name')"
                        :placeholder="$t('modal.dashboard.name')"
                      />
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="24">
                      <a-input
                        v-model="projectBrief"
                        :addon-before="$t('modal.dashboard.brief')"
                        :placeholder="$t('modal.dashboard.brief')"
                      />
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="8">
                  <CardProject
                    :disabled="true"
                    :id="dashStore.lastId.toString() || '0'"
                    :name="projectName || $t('modal.dashboard.waiting-data')"
                    :brief="projectBrief || $t('modal.dashboard.waiting-data')"
                  ></CardProject>
                </a-col>
              </a-row>
            </div>
          </keep-alive>
        </a-col>
      </a-row>
    </div>
    <template slot="footer">
      <div>
        <a-button style="margin-left: 8px" @click="resetData">
          {{ $t("modal.cancel") }}
        </a-button>
        <a-button key="submit" type="primary" @click="handleDone">
          {{ $t("modal.done") }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script>
import CardProject from "../Cards/CardProject.vue";
import { useDashStore } from "../../store/useDashStore";
import { mapStores } from "pinia";

export default {
  components: {
    CardProject,
  },
  data() {
    return {
      projectName: "",
      projectBrief: "",
    };
  },
  computed: {
    ...mapStores(useDashStore),
  },
  methods: {
    handleDone() {
      this.dashStore.addDashboard(this.projectName, this.projectBrief);
      this.resetData();
    },
    resetData() {
      this.projectName = "";
      this.projectBrief = "";
      this.dashStore.$patch({ isModalOpen: false });
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
