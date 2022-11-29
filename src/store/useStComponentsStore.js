import { defineStore } from "pinia";
import {
  min,
  max,
  sum,
  product,
  mean,
  median,
  variance,
  standardDeviation,
} from "simple-statistics";
export const useStcomponentsStore = defineStore("stcomponents", {
  state: () => ({
    isModalOpen: false,
    currentStep: 0,
    componentData: {
      type: "mean",
      title: "",
      prefix: "",
      sufix: "",
      dataId: "",
      dataQuery: "",
      qSelect: "",
      qFrom: "",
      qOrderBy: "",
      qOrderByType: "",
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
      let type = [
        "min",
        "max",
        "sum",
        "product",
        "mean",
        "median",
        "variance",
        "standardDeviation",
      ];
      this.componentData.type = type[typeId] || this.componentData.type;
    },
    addComponent() {
      var formdata = new FormData();
      formdata.append("i", this.newLayout.i);
      formdata.append("parentId", this.newLayout.parent);
      formdata.append("dataQuery", this.componentData.dataQuery);
      formdata.append("qSelect", this.componentData.qSelect);
      formdata.append("qFrom", this.componentData.qFrom);
      formdata.append("qOrderBy", this.componentData.qOrderBy);
      formdata.append("qOrderByType", this.componentData.qOrderByType);
      formdata.append("type", this.componentData.type);
      formdata.append("title", this.componentData.title);
      formdata.append("prefix", this.componentData.prefix);
      formdata.append("sufix", this.componentData.sufix);
      formdata.append("dataId", this.componentData.dataId);
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
        "http://localhost/metric_os_services/public/metric-os-api/save-st-component",
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
        "http://localhost/metric_os_services/public/metric-os-api/read-st-components",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (this.layout = JSON.parse(result)))
        .then(() => {
          let length = this.layout.length;
          this.newLayout = {
            x: 0,
            y: Math.max(...this.layout.map((component) => component.y)),
            w: 3,
            h: 3,
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
            element.data = [];
            element.metric = 0;
            element.loaded = false;
            data.map((el) => {
              element.data.push(parseInt(el[element.dataId]));
              element.metric = this.setMetric(element.type, element.data);
              element.loaded = true;
            });
          })
          .then(() => window.dispatchEvent(new Event("resize")))
          .catch((error) => console.log("error", error));
      });
    },
    setMetric(type, data) {
      switch (type) {
        case "min":
          return min(data);
        case "max":
          return max(data);
        case "sum":
          return sum(data);
        case "product":
          return product(data);
        case "mean":
          return mean(data);
        case "median":
          return median(data);
        case "variance":
          return variance(data);
        case "standardDeviation":
          return standardDeviation(data);
        default:
          return 0;
      }
    },
  },
});
