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
    setChartType(typeId) {
      let chartType = ["line", "area", "bar"];
      this.chartData.type = chartType[typeId] || this.chartData.type;
    },
    setChartZoom(zoomable) {
      this.chartData.zoom = zoomable;
    },
  },
});
