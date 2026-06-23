import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import VueRouter from "unplugin-vue-router/vite";
// import { VueRouterAutoImports } from "unplugin-vue-router";
import Components from "unplugin-vue-components/vite";
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    VueRouter({ importMode: "sync" }),
    vue(),
    Components({ resolvers: [HeadlessUiResolver()] }),
    AutoImport({
      imports: ["vue", "@vueuse/head" /*, VueRouterAutoImports*/],
    }),
    Icons({}),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    open: true,
  },
  // remove this for normal file hashing:
  // build: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: `assets/[name].js`,
  //       chunkFileNames: `assets/[name].js`,
  //       assetFileNames: `assets/[name].[ext]`,
  //     },
  //   },
  // },
});
