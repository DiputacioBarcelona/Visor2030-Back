<template>
  <div class="min-h-screen" :class="{ 'bg-gray-100': route.name === 'login' }">
    <div class="sticky top-0 z-30 bg-white shadow">
      <div class="w-full">
        <NavBar class="z-50 bg-gray-100" />
      </div>
    </div>

    <RouterView class="z-30 pb-24 pt-8" />

    <div v-if="isDev" class="fixed bottom-2 right-2">
      <RouterLink
        v-if="route.query.mode === 'edit'"
        class="ot-btn border-2 border-black bg-orange-300 hover:bg-orange-500"
        :to="{ query: { ...route.query, mode: null } }"
        >Exit edit mode</RouterLink
      >
      <RouterLink
        v-else
        class="ot-btn border-2 border-black bg-orange-300 hover:bg-orange-500"
        :to="{ query: { ...route.query, mode: 'edit' } }"
        >Enter edit mode</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const isDev = import.meta.env.DEV;

const route = useRoute();

const i18n = useI18n();
</script>
