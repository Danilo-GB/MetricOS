<template>
  <!-- modal -->
  <a-modal
    v-model="databaseStore.isModalOpen"
    :title="$t('modal.header')"
    @cancel="resetData"
    centered
    :width="800"
  >
    <div class="px-10">
      <a-steps :current="0" class="p-5">
        <a-step :title="$t('database.create')" />
      </a-steps>
      <a-row class="steps-content" type="flex" align="middle" justify="center">
        <a-col>
          <keep-alive v-if="databaseStore.isModalOpen">
            <div>
              <a-row type="flex" align="middle" justify="space-around">
                <a-col :span="12">
                  <a-row class="a_row">
                    <a-col :span="24" class="mb-20"
                      ><span class="text-item-header">{{
                        $t(`database.config`)
                      }}</span></a-col
                    >
                    <a-col :span="24">
                      <a-input
                        :addon-before="$t('database.name')"
                        :placeholder="$t('database.name')"
                        v-model="databaseStore.dbSettings.database"
                      />
                    </a-col>
                  </a-row>
                  <a-row class="a_row">
                    <a-col :span="12">
                      <a-input
                        :addon-before="$t('database.host')"
                        :placeholder="$t('database.host')"
                        v-model="databaseStore.dbSettings.host"
                      />
                    </a-col>
                    <a-col :span="12">
                      <a-input
                        :addon-before="$t('database.port')"
                        :placeholder="$t('database.port')"
                        v-model="databaseStore.dbSettings.port"
                      />
                    </a-col>
                  </a-row>
                  <a-row class="a_row">
                    <a-col :span="12">
                      <a-input
                        :addon-before="$t('database.user')"
                        :placeholder="$t('database.user')"
                        v-model="databaseStore.dbSettings.username"
                      />
                    </a-col>
                    <a-col :span="12">
                      <a-input
                        :addon-before="$t('database.passwd')"
                        :placeholder="$t('database.passwd')"
                        v-model="databaseStore.dbSettings.password"
                      />
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="8">
                  <CardDB
                    :disabled="true"
                    :id="(databaseStore.lastId + 1).toString()"
                    :name="
                      databaseStore.dbSettings.database ||
                      $t('database.waiting-data')
                    "
                    :host="databaseStore.dbSettings.host"
                    :port="databaseStore.dbSettings.port"
                  ></CardDB>
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
import { useDbStore } from "../../store/useDbStore";
import { mapStores } from "pinia";
import CardDB from "../Cards/CardDB.vue";

export default {
  components: {
    CardDB,
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useDbStore),
  },
  methods: {
    handleDone() {
      this.databaseStore.addDB();
      this.resetData();
    },
    resetData() {
      this.dbSettings = {
        host: "localhost",
        port: "3306",
        database: "",
        username: "root",
        password: "",
      };
      this.databaseStore.$patch({
        isModalOpen: false,
        dbSettings: this.dbSettings,
      });
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
.a_row {
  margin: 15px 0;
}
</style>
