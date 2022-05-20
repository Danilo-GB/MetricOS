import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let routes = [
  {
    // will match everything
    path: "*",
    component: () => import("../views/404.vue"),
  },
  {
    path: "/",
    name: "Pojects",
    layout: "dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/layout/:id",
    name: "Layout",
    layout: "dashboard",
    component: () => import("../views/Layout.vue"),
  },
  {
    path: "/analytics",
    name: "Analytics",
    layout: "dashboard",
    component: () => import("../views/Layout.vue"),
  },
  {
    path: "/ai-predictions",
    name: "Ai predictions",
    layout: "dashboard",
    component: () => import("../views/Layout.vue"),
  },
  {
    path: "/database",
    name: "Database",
    layout: "dashboard",
    component: () => import("../views/Layout.vue"),
  },
  {
    path: "/app",
    name: "Aplication",
    layout: "dashboard",
    component: () => import("../views/Layout.vue"),
  },
  {
    path: "/docs",
    name: "Docs",
    layout: "dashboard",
    component: () => import("../views/Layout.vue"),
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
