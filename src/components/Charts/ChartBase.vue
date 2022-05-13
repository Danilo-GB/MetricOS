<template>
  <div>this is a chart demo wit id {{ title }}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Chart Base",
    },
  },
};
</script>

<style></style>
