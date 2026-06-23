<template>
  <div
    class="flex h-full flex-wrap items-center justify-center gap-6 gap-y-2 px-4 py-2 pb-2 lg:flex-nowrap lg:justify-start"
  >
    <RouterLink :to="{ name: 'home' }" class="flex-shrink-0">
      <img src="/img/visor-logo.svg" alt="Visor 2030" class="h-[40px]" />
    </RouterLink>

    <div class="mx-4 flex w-16 shrink-0 items-center overflow-hidden sm:w-48">
      <RouterLink :to="{ name: 'home' }" class="font-bold"
        >Visor2030 Backoffice</RouterLink
      >
    </div>
    <!-- <nav class="mx-4 h-16 text-sm text-gray-700">
      <ul class="flex h-full">
        <li>
          <RouterLink
            class="inline-flex h-full items-center gap-2 px-2 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100 md:px-4"
            to="/"
            ><IconHome /> <span class="hidden sm:block">Home</span></RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/page"
            class="inline-flex h-full items-center gap-2 px-2 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100 md:px-4"
            >Page</RouterLink
          >
        </li>
      </ul>
    </nav> -->

    <button
      v-if="route.name !== 'login'"
      class="ot-btn ml-auto gap-2 border-none px-2"
      @click="logout"
    >
      <ArrowLeftStartOnRectangleIcon class="w-5" /> Sortir
    </button>
  </div>
</template>

<script setup>
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/vue/24/outline";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function logout() {
  // Clear the session or token
  localStorage.removeItem("visor2030-token");

  // Redirect to the login page
  router.push({ name: "login" });
}
</script>
