import { defineStore } from "pinia";

export const useChartStore = defineStore("chart", {
  state: () => ({
    isModalOpen: false,
    currentStep: 0,
    chartData: {
      type: "line",
      zoom: false,
      title: "",
      xaxis: "",
      yaxis: "",
      dataQuery: "",
    },
    layout: {
      x: null,
      y: null,
      w: null,
      h: null,
      i: null,
      parent: null,
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
    addComponent() {
      //fix new component x y w h
      var formdata = new FormData();
      formdata.append("i", this.layout.i);
      formdata.append("parentId", this.layout.parent);
      formdata.append("dataQuery", this.chartData.dataQuery);
      formdata.append("type", this.chartData.type);
      formdata.append("zoom", this.chartData.zoom);
      formdata.append("title", this.chartData.title);
      formdata.append("xaxis", this.chartData.xaxis);
      formdata.append("yaxis", this.chartData.yaxis);
      formdata.append("x", this.layout.x);
      formdata.append("y", this.layout.y);
      formdata.append("w", this.layout.w);
      formdata.append("h", this.layout.h);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/save-component",
        requestOptions
      )
        .then(document.location.reload(true))
        .catch((error) => console.log("error", error));
    },
  },
});
