<template>
  <a-modal
    v-model="createNewComponent"
    title="Vertically centered modal dialog"
    centered
    :ok-text="$t('modal.ok')"
    :cancel-text="$t('modal.cancel')"
    @ok="switchComponentCreation"
    @cancel="switchComponentCreation"
  >
    <p>some contents...</p>
    <input type="text" v-model="modalInput" />
  </a-modal>
</template>

<script>
export default {
  props: {
    createNewComponent: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    switchComponentCreation() {
      this.createNewComponent = !this.createNewComponent;
      this.$emit("onChange", this.createNewComponent);
    },
  },
};
</script>

<style></style>
