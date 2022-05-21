/*
=========================================================
MetricOS - v0.0.1 Alpha
=========================================================

Product Page: coming soon
Coded by Danilo Garcia

=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 
*/

import Vue from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import DefaultLayout from "./layouts/Default.vue";
import DashboardLayout from "./layouts/Dashboard.vue";
import router from "./router";
import "./scss/app.scss";
import i18n from "./i18n";
import { createPinia, PiniaVuePlugin } from "pinia";
import VueCompositionAPI from "@vue/composition-api";
import VueApexCharts from "vue-apexcharts";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
Vue.use(VueCompositionAPI);

Vue.use(Antd);

Vue.use(VueApexCharts);

Vue.config.productionTip = false;

// Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);

new Vue({
  router,
  i18n,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
