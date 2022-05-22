<template>
  <div>
    <a-row type="flex">
      <a-col :span="24" class="mb-20"
        ><span class="text-item-header">{{
          $t(`modal.steps.2.about`)
        }}</span></a-col
      >
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
          if (
            result.includes("error in your SQL syntax") ||
            result.includes("Syntax error")
          ) {
            this.queryTest = this.$t("query-errors.sintax");
          } else if (result.includes("table or view not found")) {
            this.queryTest = this.$t("query-errors.table-view");
          } else {
            this.queryTest = result;
            this.chartStore.$patch({
              chartData: {
                dataQuery: this.dataQuery,
              },
            });
          }
        });
    },
  },
};
</script>

<style></style>
