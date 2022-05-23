import { defineStore } from "pinia";

export const useDbStore = defineStore("database", {
  state: () => ({
    isModalOpen: false,
    lastId: 0,
    databases: [],
    dbSettings: {
      host: "localhost",
      port: "3306",
      database: "",
      username: "root",
      password: "",
    },
  }),
  actions: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    addDB() {
      var formdata = new FormData();
      formdata.append("dbHost", this.dbSettings.host);
      formdata.append("dbPort", this.dbSettings.port);
      formdata.append("dbName", this.dbSettings.database);
      formdata.append("dbUsername", this.dbSettings.username);
      formdata.append("dbPassword", this.dbSettings.password);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/add-db",
        requestOptions
      )
        .then(() => this.readDbs())
        .catch((error) => console.log("error", error));
    },
    readDbs() {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/read-dbs",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (this.databases = JSON.parse(result)))
        .then(() => (this.lastId = this.databases.length))
        .catch((error) => console.log("error", error));
    },
    switchDatabase(dbId) {
      var formdata = new FormData();
      formdata.append("dbHost", this.databases[dbId].host);
      formdata.append("dbPort", this.databases[dbId].port);
      formdata.append("dbName", this.databases[dbId].database);
      formdata.append("dbUsername", this.databases[dbId].username);
      formdata.append("dbPassword", this.databases[dbId].password);
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/switch-db",
        requestOptions
      ).catch((error) => console.log("error", error));
    },
    deleteDatabase(dbId) {
      var formdata = new FormData();
      formdata.append("dbId", dbId);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/delete-db",
        requestOptions
      )
        .then(() => this.readDbs())
        .catch((error) => console.log("error", error));
    },
  },
});
