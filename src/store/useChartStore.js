import { defineStore } from "pinia";

export const useChartStore = defineStore("chart", {
  state: () => ({
    isModalOpen: false,
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++;
    },
  },
});
