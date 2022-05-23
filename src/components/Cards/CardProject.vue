<template>
  <!-- Project Card -->
  <a-card class="card-project">
    <img
      slot="cover"
      alt="example"
      src="https://img.freepik.com/vector-gratis/flat-tiny-people-comunicacion-concepto-socio-discusion-proyectos-empresariales_513217-78.jpg?t=st=1653061709~exp=1653062309~hmac=bd231a1a48c8fb86909b3823473bc2edf372c034ced64de075968637f694e656&w=740"
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
          @click="$router.push({ path: `/layout/${id}` })"
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
