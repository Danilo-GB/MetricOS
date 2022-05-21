import { defineStore } from "pinia";

export const useChartStore = defineStore("chart", {
  state: () => ({
    isModalOpen: false,
    currentStep: 0,
    chartData: {
      seriesName: "",
      seriesData: [],
      type: "",
      zoom: false,
      title: "",
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
      formdata.append("component", "VueChart");
      formdata.append(
        "dataQuery",
        "Select * FROM producto WHERE 1=1 ORDER BY id LIMIT 2"
      );
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
