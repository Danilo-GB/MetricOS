import Vue from "vue";
import VueRouter from "vue-router";

import notFound from "../views/404.vue";
import Dashboard from "../views/Dashboard.vue";
import Layout from "../views/Layout.vue";
import Statistics from "../views/Statistics.vue";
import AnalyticsDashboard from "../views/AnalyticsDashboard.vue";
import Database from "../views/Database.vue";

Vue.use(VueRouter);

let routes = [
  {
    // will match everything
    path: "*",
    component: notFound,
  },
  {
    path: "/",
    name: "Pojects",
    layout: "dashboard",
    component: Dashboard,
  },
  {
    path: "/layout/:id",
    name: "Layout",
    layout: "dashboard",
    component: Layout,
  },
  {
    path: "/analytics",
    name: "Analytics",
    layout: "dashboard",
    component: Statistics,
  },
  {
    path: "/statistics/:id",
    name: "Statistics",
    layout: "dashboard",
    component: AnalyticsDashboard,
  },
  {
    path: "/ai-predictions",
    name: "Ai predictions",
    layout: "dashboard",
    component: notFound,
  },
  {
    path: "/database",
    name: "Database",
    layout: "dashboard",
    component: Database,
  },
  {
    path: "/app",
    name: "Aplication",
    layout: "dashboard",
    component: notFound,
  },
  {
    path: "/docs",
    name: "Docs",
    layout: "dashboard",
    component: notFound,
  },
];

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute(route, parentLayout = "default") {
  route.meta = route.meta || {};
  route.meta.layout = route.layout || parentLayout;

  if (route.children) {
    route.children = route.children.map((childRoute) =>
      addLayoutToRoute(childRoute, route.meta.layout)
    );
  }
  return route;
}

routes = routes.map((route) => addLayoutToRoute(route));

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }
    return {
      x: 0,
      y: 0,
      behavior: "smooth",
    };
  },
});

export default router;
