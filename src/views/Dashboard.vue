<template>
  <div class="mb-24">
    <project-creator></project-creator>
    <!-- / Floating Action Button For Toggling -->
    <!-- Projects Card -->
    <a-card
      :bordered="false"
      class="header-solid h-full mb-24"
      :bodyStyle="{ paddingTop: '14px' }"
    >
      <template #title>
        <h6 class="font-semibold">{{ $t("projects.title") }}</h6>
        <p>{{ $t("projects.header") }}</p>
      </template>

      <a-row type="flex" :gutter="[24, 24]" align="stretch">
        <!-- Project Column -->
        <a-col
          :span="24"
          :md="12"
          :xl="6"
          v-for="(project, index) in dashStore.projects"
          :key="index"
        >
          <CardProject
            :id="project.id"
            :name="project.name"
            :brief="project.brief"
          ></CardProject>
        </a-col>
        <!-- / Project Column -->

        <!-- Project Column -->
        <a-col :span="24" :md="12" :xl="6" @click="dashStore.toggleModal">
          <!-- Project Upload Component -->
          <div type="flex" align="center" class="project-create">
            <div class="project-create-content">
              <a-icon type="plus" />
              <div>
                {{ $t("projects.create") }}
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
import { useDashStore } from "../store/useDashStore";
import CardProject from "../components/Cards/CardProject";
import ProjectCreator from "../components/Modals/ProjectCreator.vue";

export default {
  components: {
    CardProject,
    ProjectCreator,
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useDashStore),
  },
  methods: {},

  created() {
    this.dashStore.readDashboards();
  },
};
</script>

<style>
.project-create {
  border: 2px dashed black;
  border-radius: 10px;
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
