import { defineStore } from "pinia";

export const useChartStore = defineStore("chart", {
  state: () => ({
    isModalOpen: false,
    currentStep: 0,
    layout: [],
    chartData: {
      seriesName: "",
      seriesData: [],
      type: "",
      zoom: false,
      title: "",
    },
  }),
  actions: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    increment() {
      this.counter++;
    },
  },
});
