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

// import './plugins/click-away'

import "./scss/app.scss";

import i18n from './i18n'

Vue.use(Antd);

Vue.config.productionTip = false;

// Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);

new Vue({
  router,
  i18n,
  render: (h) => h(App)
}).$mount("#app");
