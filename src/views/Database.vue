<template>
  <div class="mb-24">
    <db-creator></db-creator>
    <!-- Projects Card -->
    <a-card
      :bordered="false"
      class="header-solid h-full mb-24"
      :bodyStyle="{ paddingTop: '14px' }"
    >
      <template #title>
        <h6 class="font-semibold">{{ $t("database.title") }}</h6>
        <p>{{ $t("database.header") }}</p>
      </template>

      <a-row type="flex" :gutter="[24, 24]" align="stretch">
        <!-- Project Column -->
        <a-col
          :span="24"
          :md="12"
          :xl="6"
          v-for="(db, index) in databaseStore.databases"
          :key="index"
        >
          <CardDB
            :id="index.toString()"
            :name="db.DB_USER_DATABASE"
            :host="db.DB_USER_HOST"
            :port="db.DB_USER_PORT"
          ></CardDB>
        </a-col>
        <!-- / Project Column -->

        <!-- Project Column -->
        <a-col :span="24" :md="12" :xl="6" @click="databaseStore.toggleModal">
          <!-- Project Upload Component -->
          <div type="flex" align="center" class="project-create">
            <div class="project-create-content">
              <a-icon type="plus" />
              <div>
                {{ $t("database.create") }}
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
import { useDbStore } from "../store/useDbStore";
import CardDB from "../components/Cards/CardDB";
import DbCreator from "../components/Modals/dbCreator.vue";

export default {
  components: {
    CardDB,
    DbCreator,
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useDbStore),
  },
  methods: {},

  created() {
    this.databaseStore.readDbs();
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
