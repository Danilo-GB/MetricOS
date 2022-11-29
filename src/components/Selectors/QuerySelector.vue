<template>
  <div>
    <a-row type="flex">
      <a-col :span="24" class="mb-20"
        ><span class="text-item-header"
          >{{ $t(`modal.steps.2.about`) }}: {{ dbInfo.DB_Name }}</span
        ></a-col
      >
      <div v-if="dbInfo.DB_Driver === 'mysql'">
        <a-col :span="8">
          <a-input
            v-model="select"
            :addon-before="$t('query.select')"
            :placeholder="$t('query.data')"
          />
        </a-col>
        <a-col :span="8">
          <a-input
            v-model="from"
            :addon-before="$t('query.from')"
            :placeholder="$t('query.table')"
          />
        </a-col>
        <a-col :span="8">
          <a-input
            v-model="where"
            :addon-before="$t('query.where')"
            :placeholder="$t('query.condition')"
          />
        </a-col>
        <a-col :span="6">
          <a-input
            v-model="having"
            :addon-before="$t('query.having')"
            :placeholder="$t('query.condition')"
          />
        </a-col>
        <a-col :span="8">
          <a-input
            v-model="groupby"
            :addon-before="$t('query.group-by')"
            :placeholder="$t('query.condition')"
          />
        </a-col>
        <a-col :span="10">
          <a-input
            v-model="orderby"
            :addon-before="$t('query.order-by')"
            :placeholder="$t('query.condition')"
          >
            <a-switch slot="addonAfter" v-model="orderType">
              <a-icon slot="checkedChildren" type="up" />
              <a-icon slot="unCheckedChildren" type="down" />
            </a-switch>
          </a-input>
        </a-col>
      </div>
      <div v-if="dbInfo.DB_Driver === 'mongodb'">
        <a-col :span="12">
          <a-input
            v-model="select"
            :addon-before="$t('query.select')"
            :placeholder="$t('query.data')"
          />
        </a-col>
        <a-col :span="12">
          <a-input
            v-model="from"
            :addon-before="$t('query.from')"
            :placeholder="$t('query.table')"
          />
        </a-col>
        <a-col :span="24">
          <a-input
            v-model="orderby"
            :addon-before="$t('query.order-by')"
            :placeholder="$t('query.condition')"
          >
            <a-switch slot="addonAfter" v-model="orderType">
              <a-icon slot="checkedChildren" type="up" />
              <a-icon slot="unCheckedChildren" type="down" />
            </a-switch>
          </a-input>
        </a-col>
      </div>
      <a-col :span="24" class="mt-10">
        <a-button @click="testQuery">{{ $t("button.test") }}</a-button>
      </a-col>
      <a-col :span="24" class="my-20"
        ><span class="text-item-header">{{
          $t(`modal.steps.2.data-preview`)
        }}</span></a-col
      >
      <a-col :span="24" class="mb-20"
        ><span v-if="queryTest == null" class="text-item-header">{{
          $t(`modal.steps.2.waiting-query`)
        }}</span>
        <span v-else>
          {{ queryTest }}
        </span>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useChartStore } from "../../store/useChartStore";
export default {
  props: {
    stepId: {
      type: Number,
      default: "",
    },
  },
  data() {
    return {
      select: "*",
      from: "",
      where: "",
      having: "",
      groupby: "",
      orderby: "",
      orderType: true,
      queryTest: null,
      dbInfo: null,
    };
  },
  computed: {
    ...mapStores(useChartStore),
    dataQuery() {
      let query = "SELECT ";
      query += this.select == "" ? "*" : this.select;
      query += ` FROM ${this.from}`;
      query += this.where == "" ? "" : ` WHERE ${this.where}`;
      query += this.having == "" ? "" : ` HAVING ${this.having}`;
      query += this.groupby == "" ? "" : ` GROUP BY ${this.groupby} `;
      query +=
        this.orderby != "" && this.orderType
          ? ` ORDER BY ${this.orderby} ASC`
          : this.orderby != "" && !this.orderType
          ? ` ORDER BY ${this.orderby} DESC`
          : "";
      return query;
    },
  },
  methods: {
    testQuery() {
      var formdata = new FormData();
      formdata.append("dataQuery", this.dataQuery);
      formdata.append("qSelect", this.select == "" ? "*" : this.select);
      formdata.append("qFrom", this.from);
      formdata.append("qOrderBy", this.orderby == "" ? "*" : this.orderby);
      formdata.append("qOrderByType", this.orderType ? "ASC" : "DESC");

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
        .then((result) => {
          console.log(result);
          if (
            result.includes("error in your SQL syntax") ||
            result.toLowerCase().includes("syntax error")
          ) {
            this.queryTest = this.$t("query-errors.sintax");
          } else if (result.toLowerCase().includes("table or view not found")) {
            this.queryTest = this.$t("query-errors.table-view");
          } else if (result.toLowerCase().includes("internal server error")) {
            this.queryTest = this.$t("query-errors.server");
          } else {
            this.queryTest = result;
            this.chartStore.$patch({
              chartData: {
                dataQuery: this.dataQuery,
                qSelect: this.select == "" ? "*" : this.select,
                qFrom: this.from,
                qOrderBy: this.orderby == "" ? "*" : this.orderby,
                qOrderByType: this.orderType ? "ASC" : "DESC",
              },
            });
          }
        });
    },
  },
  created() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost/metric_os_services/public/metric-os-api/getDb",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => (this.dbInfo = JSON.parse(result)))
      .catch((error) => console.log("error", error));
  },
};
</script>

<style></style>
