<template>
  <div class="mb-24">
    <AnalyticsCreator></AnalyticsCreator>
    <!-- Projects Card -->
    <a-card
      :bordered="false"
      class="header-solid h-full mb-24"
      :bodyStyle="{ paddingTop: '14px' }"
    >
      <template #title>
        <h6 class="font-semibold">{{ $t("statistics.title") }}</h6>
        <p>{{ $t("statistics.header") }}</p>
      </template>

      <a-row type="flex" :gutter="[24, 24]" align="stretch">
        <!-- Project Column -->
        <a-col
          :span="24"
          :md="12"
          :xl="6"
          v-for="(project, index) in statisticsStore.projects"
          :key="index"
        >
          <CardStatistics
            :id="index.toString()"
            :name="project.name"
            :brief="project.brief"
          ></CardStatistics>
        </a-col>
        <!-- / Project Column -->

        <!-- Project Column -->
        <a-col :span="24" :md="12" :xl="6" @click="statisticsStore.toggleModal">
          <!-- Project Upload Component -->
          <div type="flex" align="center" class="project-create">
            <div class="project-create-content">
              <a-icon type="plus" />
              <div>
                {{ $t("statistics.create") }}
              </div>
            </div>
          </div>
          <!-- / Project Upload Component -->
        </a-col>
        <!-- / Project Column -->
      </a-row>
    </a-card>
    <!-- / Projects Card -->
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStatisticsStore } from "../store/useStatisticsStore";
import CardStatistics from "../components/Cards/CardStatistics";
import AnalyticsCreator from "../components/Modals/AnalyticsCreator.vue";

export default {
  components: {
    CardStatistics,
    AnalyticsCreator,
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useStatisticsStore),
  },
  methods: {},

  created() {
    this.statisticsStore.readDashboards();
  },
};
</script>

<style>
.project-create {
  border: 2px dashed black;
  border-radius: 10px;
  height: 100%;
  transition: all 0.1s ease-in;
}
.project-create:hover {
  border: 2px dashed rgb(0, 189, 247);
  border-radius: 20px;
  cursor: pointer;
  color: rgb(0, 189, 247);
}
.project-create-content {
  position: relative;
  top: 40%;
}
</style>
