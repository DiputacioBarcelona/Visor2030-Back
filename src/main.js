import { createApp } from "vue";
import "./tailwind.css";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router/auto";
import { createHead } from "@vueuse/head";
import { routes } from "./routes.js";
import { createI18n } from "vue-i18n";
import ca from "./locales/ca.json";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

const app = createApp(App);
const head = createHead();

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: (/* routes */) => {
    // const adminRoute = routes.find((r) => r.name === '/admin')
    // if (adminRoute) {
    //   adminRoute.meta ??= {}
    //   adminRoute.meta.requiresAuth = true
    // }
    // // completely optional since we are modifying the routes in place
    return routes;
  },
  scrollBehavior(to, from, savedPosition) {
    if (to.name !== from.name) {
      return { top: 0 };
    }
  },
});

// Global beforeEach guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("visor2030-token");

  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else {
    next();
  }
});

const i18n = createI18n({
  // vue-i18n options
  legacy: false, // to use Composition API
  globalInjection: true, // use $t directly in template
  locale: "ca", // https://vue-i18n.intlify.dev/guide/advanced/composition.html#locale-changing
  fallbackLocale: "ca",
  messages: {
    ca,
  },
});

app.use(ToastPlugin);
app.use(router);
app.use(head);
app.use(i18n);
app.mount("#app");
