<template>
  <span v-if="route.query.mode === 'edit'" class="relative inline-block">
    <button
      class="absolute inset-0 scale-105 rounded border border-orange-700 bg-orange-200 hover:bg-orange-300"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @click.stop="modalOpen = true"
    ></button>
    <span
      class="pointer-events-none absolute -left-px -top-5 flex items-center rounded border border-orange-700 bg-orange-200 p-px pr-2"
    >
      <PencilSquareIcon class="h-5 w-5 text-orange-700" />
      <span v-if="hover" class="text-xxs lowercase leading-3"
        >Click to edit</span
      >
    </span>

    <span class="pointer-events-none relative">{{ $t(value, options) }}</span>

    <OTModal
      :is-open="modalOpen"
      @close="modalOpen = false"
      dialog-class="w-screen "
      container-class="p-0"
    >
      <template #header>
        <div class="">Edit text: {{ value }}</div>
      </template>
      <template #body>
        <textarea
          name=""
          id=""
          class="h-64 w-full rounded border border-gray-300 p-4"
          v-model="input"
        ></textarea>
        <button class="ot-btn" @click="save">Save text</button>

        <!-- <pre class="ot-code">{{ i18n.messages }}</pre> -->
      </template>
    </OTModal>
  </span>
  <template v-else>{{ $t(value, options) }}</template>
</template>

<script setup>
import { PencilSquareIcon } from "@heroicons/vue/24/outline";
// import i18n and use it
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const props = defineProps({
  value: String,
  options: Object,
});

const route = useRoute();

const hover = ref(false);
const modalOpen = ref(false);

// instantiate useI18n
const i18n = useI18n();

// const input = ref(
//   getValueFromNestedObject(i18n.messages.value[locale.value], props.value)
// );

const locale = computed(() => {
  return i18n.locale.value;
});

const input = computed({
  get: () =>
    getValueFromNestedObject(i18n.messages.value[locale.value], props.value),
  set: (value) =>
    setValueInNestedObject(
      i18n.messages.value[locale.value],
      props.value,
      value,
    ),
});

function save() {
  // TODO: replace this with an actual API call to save the value
  setValueInNestedObject(
    i18n.messages.value[locale.value],
    props.value,
    input.value,
  );

  //   i18n.messages.value[locale.value].satisfaction.title = input.value;
  modalOpen.value = false;
}

function getValueFromNestedObject(obj, path) {
  // Split the path string into an array of keys
  const keys = path.split(".");

  // Iterate through the keys to access the nested properties
  let value = obj;
  for (let key of keys) {
    value = value[key];
    // If at any point the nested property is undefined, return undefined
    if (value === undefined) {
      return undefined;
    }
  }

  return value;
}

function setValueInNestedObject(obj, path, value) {
  // Split the path string into an array of keys
  const keys = path.split(".");

  // Reference to the current level of the object
  let current = obj;

  // Traverse the object to reach the nested property
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    // Create the nested object if it doesn't exist
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    // Move to the next level
    current = current[key];
  }

  // Set the value at the end of the path
  current[keys[keys.length - 1]] = value;
}
</script>
