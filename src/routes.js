import Home from "./pages/index.vue";
import NotFound from "./pages/[...404].vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home",
    },
    children: [
      {
        path: "/:id",
        name: "indicator",
        component: () => import("./pages/indicator.vue"),
      },
    ],
  },
  // login
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/login.vue"),
    meta: {
      title: "Login",
    },
  },

  { path: "/:path(.*)", component: NotFound },
];
