<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-50">
    <body class="h-full">
    ```
  -->
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-10 w-auto"
        src="/img/visor-logo.svg"
        alt="Visor 2030"
      />
      <h2
        class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Accedeix a l'àrea privada
      </h2>
    </div>

    <div v-if="error">
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="rounded-lg bg-red-200 p-4">{{ error }}</div>
      </div>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form
          class="space-y-6"
          action="#"
          method="POST"
          @submit.prevent="submit"
        >
          <div>
            <label
              for="username"
              class="block text-sm/6 font-medium text-gray-900"
              >Usuari</label
            >
            <div class="mt-2">
              <input
                v-model="username"
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                required=""
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-0 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                required=""
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-0 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="relative flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
            >
              <span :class="{ 'opacity-0': loading }">Accedeix</span>

              <LoadingSpinner
                :loading="loading"
                class="inset-0"
                bg-color-class="bg-transparent"
                :border-class="`h-6 w-6 border-2 border-white`"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/services/data";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const error = ref(null);
const loading = ref(false);

// const { loadData: postLogin, error } = useLoadData("login", {}, false);

async function submit() {
  const postData = {
    username: username.value,
    password: password.value,
  };

  error.value = "";
  loading.value = true;

  try {
    const response = await api.login(postData);
    // it worked. store token and redirect
    localStorage.setItem("visor2030-token", response.data.token);

    router.push({
      name: "home",
    });
  } catch (err) {
    error.value = err.response.data.error;
    console.error(err.response.data.error);
  } finally {
    loading.value = false;
  }
}
</script>
