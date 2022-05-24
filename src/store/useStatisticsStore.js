import { defineStore } from "pinia";

export const useStatisticsStore = defineStore("statistics", {
  state: () => ({
    isModalOpen: false,
    lastId: 0,
    projects: [],
  }),
  actions: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    addDashboard(projectName, projectBrief) {
      var formdata = new FormData();
      formdata.append("id", this.lastId);
      formdata.append("name", projectName);
      formdata.append("brief", projectBrief);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/add-st-dashboard",
        requestOptions
      )
        .then(() => this.readDashboards())
        .catch((error) => console.log("error", error));
    },
    readDashboards() {
      var requestOptions = {
        method: "POST",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/read-st-dashboards",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (this.projects = JSON.parse(result)))
        .then(() => (this.lastId = this.projects.length))
        .catch((error) => console.log("error", error));
    },
  },
});
