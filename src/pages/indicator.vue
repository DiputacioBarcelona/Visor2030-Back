<template>
  <form @submit="submit">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base/7 font-semibold text-gray-900">
          {{ editableData.nom_sintetic }}
        </h2>
        <p class="mt-1 text-sm/6 text-gray-600">Metadades de l'indicador</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label
              for="username"
              class="block text-sm/6 font-medium text-gray-900"
              >Nom sintètic</label
            >
            <div class="mt-2">
              <input
                v-model="editableData.nom_sintetic"
                type="text"
                name="nom_sintetic"
                id="nom_sintetic"
                placeholder="Nom sintètic"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label for="about" class="block text-sm/6 font-medium text-gray-900"
              >Nom complet</label
            >
            <div class="mt-2">
              <textarea
                v-model="editableData.nom_complet"
                name="description"
                id="description"
                rows="2"
                placeholder="Nom complet"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <!-- <p class="mt-3 text-sm/6 text-gray-600"></p> -->
          </div>

          <div class="col-span-full">
            <label for="about" class="block text-sm/6 font-medium text-gray-900"
              >Definició</label
            >
            <div class="mt-2">
              <textarea
                name="definition"
                id="definition"
                rows="2"
                placeholder="Definició"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <!-- <p class="mt-3 text-sm/6 text-gray-600"></p> -->
          </div>

          <div class="col-span-full">
            <label for="about" class="block text-sm/6 font-medium text-gray-900"
              >Font de dades i metodologia</label
            >
            <div class="mt-2">
              <textarea
                v-model="editableData.source"
                name="source"
                id="source"
                rows="5"
                placeholder="Font de dades i metodologia"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <!-- <p class="mt-3 text-sm/6 text-gray-600"></p> -->
          </div>
        </div>
      </div>

      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base/7 font-semibold text-gray-900">Unitats</h2>
        <p class="mt-1 text-sm/6 text-gray-600">
          Etiquetes referents a les unitats de mesura de l'indicador.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-6">
            <label for="email" class="block text-sm/6 font-medium text-gray-900"
              >Unitat final</label
            >
            <div class="mt-2">
              <input
                v-model="editableData.unit"
                id="unit"
                name="unit"
                type="text"
                autocomplete="unit"
                placeholder="Unitat final"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="first-name"
              class="block text-sm/6 font-medium text-gray-900"
              >Títol del numerador</label
            >
            <div class="mt-2">
              <input
                v-model="editableData.numerator_title"
                type="text"
                name="numerator_title"
                id="numerator_title"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="numerator_unit"
              class="block text-sm/6 font-medium text-gray-900"
              >Unitat del numerador</label
            >
            <div class="mt-2">
              <input
                v-model="editableData.numerator_unit"
                type="text"
                name="numerator_unit"
                id="numerator_unit"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="denominator_title"
              class="block text-sm/6 font-medium text-gray-900"
              >Títol del denominador</label
            >
            <div class="mt-2">
              <input
                v-model="editableData.denominator_title"
                type="text"
                name="denominator_title"
                id="denominator_title"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="denominator_unit"
              class="block text-sm/6 font-medium text-gray-900"
              >Unitat del denominador</label
            >
            <div class="mt-2">
              <input
                v-model="editableData.denominator_unit"
                type="text"
                name="denominator_unit"
                id="denominator_unit"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base/7 font-semibold text-gray-900">Càlculs</h2>
        <p class="mt-1 text-sm/6 text-gray-600">
          Informació per a calcular els indicadors sintètics.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="weight"
              class="block text-sm/6 font-medium text-gray-900"
              >Pes (dins de l'ODS)</label
            >
            <div class="mt-2">
              <input
                v-model="editableData.weight"
                id="weight"
                name="weight"
                type="number"
                placeholder="Pes en l'ODS"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="dimension_weight"
              class="block text-sm/6 font-medium text-gray-900"
              >Pes (dins de la dimensió)</label
            >
            <div class="mt-2">
              <input
                v-model="editableData.dimension_weight"
                id="dimension_weight"
                name="dimension_weight"
                type="number"
                placeholder="Pes en la dimensió"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="calculation"
              class="block text-sm/6 font-medium text-gray-900"
              >Càlcul</label
            >
            <div class="mt-2">
              <select
                v-model="editableData.calculation"
                id="calculation"
                name="calculation"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="simple">
                  Simple (Utilitza només numerador)
                </option>
                <option value="ratio">
                  Ratio (Divideix numerador entre denominador)
                </option>
                <option value="difference">
                  Diferència (Resta denominador de numerador)
                </option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="sign" class="block text-sm/6 font-medium text-gray-900"
              >Sentit</label
            >
            <div class="mt-2">
              <select
                v-model="editableData.sign"
                id="sign"
                name="sign"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option :value="true">Positiu (Més gran és millor)</option>
                <option :value="false">Negatiu (Més petit és millor)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="button"
        class="text-sm/6 font-semibold text-gray-900"
        @click="cancel"
      >
        Cancel·lar
      </button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Desar
      </button>
    </div>
  </form>
</template>

<script setup>
import { PhotoIcon, UserCircleIcon } from "@heroicons/vue/24/solid";
import { ChevronDownIcon } from "@heroicons/vue/16/solid";
import useLoadData from "@/functions/useLoadData";
import useRunETL from "@/functions/useRunETL";
import { useRouter, useRoute } from "vue-router";
import useLoadLabels from "@/functions/useLoadLabels";
import { useI18n } from "vue-i18n";

const i18n = useI18n();

const locale = computed(() => {
  return i18n.locale.value;
});

const router = useRouter();
const route = useRoute();

const { data, loading, error } = useLoadData("getIndicator", {});

const emit = defineEmits(["submit"]);

const pieces = computed(() => {
  const [sdg, target, indicator] = data.value.indicator_id?.split(".") || [];
  return {
    sdg: sdg,
    target: target,
    indicator: indicator,
    //   subindicator: subindicator.value,
  };
});

const labels = inject("labels");

const editableData = ref({});

// const { loadData: postLabels } = useRunETL("postLabels", {});

// use the componsable but not load labels on mount
const { postLabels } = useLoadLabels(false);

const { loadData: postIndicator } = useLoadData("postIndicator", {}, false);

// when labels and data are loaded, create the object
watch(
  () => {
    return { labels: labels.value, pieces: pieces.value, data: data.value };
  },
  ({ labels, pieces }) => {
    createInitialObject(pieces);
  },
);

function createInitialObject(pieces) {
  const { sdg, target, indicator } = pieces;

  const labels = i18n.messages.value[locale.value];

  editableData.value = {
    nom_sintetic:
      labels.SDGS?.[sdg].TARGETS[target].INDICATORS[indicator].TITLE,
    nom_complet:
      labels.SDGS?.[sdg].TARGETS[target].INDICATORS[indicator].DESCRIPTION,
    definition:
      labels.SDGS?.[sdg].TARGETS[target].INDICATORS[indicator].DEFINITION,
    source: labels.SDGS?.[sdg].TARGETS[target].INDICATORS[indicator].SOURCE,
    unit: labels.SDGS?.[sdg].TARGETS[target].INDICATORS[indicator].UNIT,
    numerator_title:
      labels.SDGS?.[sdg].TARGETS[target].INDICATORS[indicator].VALUES?.[1]
        ?.TITLE,
    numerator_unit:
      labels.SDGS?.[sdg].TARGETS[target].INDICATORS[indicator].VALUES?.[1]
        ?.UNIT,
    denominator_title:
      labels.SDGS?.[sdg].TARGETS[target].INDICATORS[indicator].VALUES?.[2]
        ?.TITLE,
    denominator_unit:
      labels.SDGS?.[sdg].TARGETS[target].INDICATORS[indicator].VALUES?.[2]
        ?.UNIT,
    weight: data.value.weight || 0,
    calculation: data.value.calculation || "simple",
    sign: data.value.sign,
    dimension_weight: data.value.dimension_weight || 0,
  };
}

function cancel() {
  // return to home
  router.push({ name: "home", query: route.query });
}

async function submit(e) {
  e.preventDefault();

  const { sdg, target, indicator } = pieces.value;

  // hierarchically data
  const postData = {
    SDGS: {
      [sdg]: {
        TARGETS: {
          [target]: {
            INDICATORS: {
              [indicator]: {
                TITLE: editableData.value.nom_sintetic,
                DESCRIPTION: editableData.value.nom_complet,
                DEFINITION: editableData.value.definition,
                SOURCE: editableData.value.source,
                UNIT: editableData.value.unit,
                VALUES: {
                  1: {
                    TITLE: editableData.value.numerator_title,
                    UNIT: editableData.value.numerator_unit,
                  },
                  2: {
                    TITLE: editableData.value.denominator_title,
                    UNIT: editableData.value.denominator_unit,
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  const postIndicatorData = {
    id: data.value.id,
    // indicator_id: pieces.value.indicator,
    weight: editableData.value.weight,
    calculation: editableData.value.calculation,
    sign: editableData.value.sign,
    dimension_weight: editableData.value.dimension_weight,
  };

  // console.log(postData);
  // console.log(postIndicatorData);

  // post the data (automatically reloads the labels in the locales)
  await Promise.all([postLabels(postData), postIndicator(postIndicatorData)]);

  cancel();
}
</script>
