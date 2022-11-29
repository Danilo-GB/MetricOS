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
    newLayout: {
      x: null,
      y: null,
      w: null,
      h: null,
      i: null,
      parent: null,
    },
    layout: [],
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
      var formdata = new FormData();
      formdata.append("i", this.newLayout.i);
      formdata.append("parentId", this.newLayout.parent);
      formdata.append("dataQuery", this.chartData.dataQuery);
      formdata.append("dataQuery", this.chartData.dataQuery);
      formdata.append("qSelect", this.chartData.qSelect);
      formdata.append("qFrom", this.chartData.qFrom);
      formdata.append("qOrderBy", this.chartData.qOrderBy);
      formdata.append("qOrderByType", this.chartData.qOrderByType);
      formdata.append("type", this.chartData.type);
      formdata.append("zoom", this.chartData.zoom);
      formdata.append("title", this.chartData.title);
      formdata.append("xaxis", this.chartData.xaxis);
      formdata.append("yaxis", this.chartData.yaxis);
      formdata.append("x", this.newLayout.x);
      formdata.append("y", this.newLayout.y);
      formdata.append("w", this.newLayout.w);
      formdata.append("h", this.newLayout.h);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/save-component",
        requestOptions
      )
        .then(() => location.reload(true))
        .catch((error) => console.log("error", error));
    },
    async readComponents(parentId) {
      var formdata = new FormData();
      formdata.append("dashboardId", parentId);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      await fetch(
        "http://localhost/metric_os_services/public/metric-os-api/read-components",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (this.layout = JSON.parse(result)))
        .then(() => {
          let length = this.layout.length;
          this.newLayout = {
            x: 0,
            y: Math.max(...this.layout.map((component) => component.y)),
            w: 7,
            h: 7,
            i: this.layout[length - 1].i + 1,
            parent: parentId,
          };
        })
        .then(() => this.readComponentsData())
        .catch((error) => console.log("error", error));
    },
    readComponentsData() {
      this.layout.map((element) => {
        var formdata = new FormData();
        formdata.append("dataQuery", element.dataQuery);
        formdata.append("qSelect", element.qSelect);
        formdata.append("qFrom", element.qFrom);
        formdata.append("qOrderBy", element.qOrderBy);
        formdata.append("qOrderByType", element.qOrderByType);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch(
          "http://localhost/metric_os_services/public/metric-os-api/query",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => (result = JSON.parse(result)))
          .then((data) => {
            element.xLabels = [];
            element.yData = [];
            element.loaded = false;
            data.map((el) => {
              element.xLabels.push(el[element.xaxis]);
              element.yData.push(parseInt(el[element.yaxis]));
              element.loaded = true;
            });
          })
          .then(() => window.dispatchEvent(new Event("resize")))
          .catch((error) => console.log("error", error));
      });
    },
  },
});
