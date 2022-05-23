<template>
  <!-- Project Card -->
  <a-card class="card-project">
    <img
      slot="cover"
      alt="example"
      src="https://img.freepik.com/vector-gratis/concepto-procesamiento-datos-grandes-sala-servidores-acceso-token-tecnologia-blockchain_39422-812.jpg?t=st=1653263997~exp=1653264597~hmac=02179aee2320deb09ea82cd1a95c5776ebb578cf3814207eb520eb70de81815f&w=740"
      height="134"
    />
    <div class="card-tag">
      {{ $t("database.single") }} # {{ parseInt(id) + 1 }}
    </div>
    <h5>{{ name }}</h5>
    <p>{{ $t("database.host") }} : {{ host }}</p>
    <p>{{ $t("database.port") }} : {{ port }}</p>
    <a-row type="flex" class="card-footer" justify="space-between">
      <a-col :span="12">
        <a-button
          v-if="!isSelected"
          @click="handleSelect(id)"
          type="primary"
          size="small"
          :disabled="disabled"
          >{{ $t("database.select-db") }}</a-button
        >
        <a-button v-else size="small" :disabled="isSelected">{{
          $t("database.selected-db")
        }}</a-button></a-col
      ><a-col :span="12">
        <a-button
          @click="handleDelete(id)"
          type="danger"
          size="small"
          :disabled="disabled"
          >{{ $t("database.delete-db") }}</a-button
        >
      </a-col>
    </a-row>
  </a-card>
  <!-- / Project Card -->
</template>

<script>
import { useDbStore } from "../../store/useDbStore";
import { mapStores } from "pinia";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    port: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapStores(useDbStore),
    isSelected() {
      return this.databaseStore.selectedDb == this.id ? true : false;
    },
  },
  methods: {
    handleSelect(id) {
      this.databaseStore.switchDatabase(id);
      this.databaseStore.selectedDb = id;
    },
    handleDelete(id) {
      this.databaseStore.deleteDatabase(id);
    },
  },
};
</script>
