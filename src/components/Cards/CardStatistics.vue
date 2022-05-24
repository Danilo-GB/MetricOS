<template>
  <!-- Project Card -->
  <a-card class="card-project">
    <img
      slot="cover"
      alt="example"
      src="https://img.freepik.com/vector-gratis/analisis-rendimiento-empresarial-graficos_53876-66260.jpg?t=st=1653351012~exp=1653351612~hmac=50c64c2edafbeb5a249f9ab6f61aee1ede0ae777ed19f6cbe7a75316f37c72db&w=740"
      width="234"
      height="134"
    />
    <div class="card-tag">
      {{ $t("projects.single") }} # {{ parseInt(id) + 1 }}
    </div>
    <h5>{{ name }}</h5>
    <p>{{ brief }}</p>
    <a-row type="flex" :gutter="6" class="card-footer" align="middle">
      <a-col :span="12">
        <a-button
          @click="$router.push({ path: `/statistics/${id}` })"
          :disabled="disabled"
          size="small"
          >{{ $t("projects.view-project") }}</a-button
        >
      </a-col>
    </a-row>
  </a-card>
  <!-- / Project Card -->
</template>

<script>
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
    brief: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>
