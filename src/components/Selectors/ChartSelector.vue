<template>
  <div>
    chart selector component {{ counter }}
    <button @click="counter++">+</button>
    <button @click="counter--">-</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
};
</script>

<style></style>
