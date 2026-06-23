<template>
  <div class="rounded-md border bg-gray-50 p-4">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex-grow">
        <h4 class="mb-0 font-medium">
          <OTText
            :value="`SDGS.${target.sdg}.TARGETS.${target.target_id.split('.')[1]}.INDICATORS.${indicator.indicator_id?.split('.')[2]}.TITLE`"
          />
        </h4>
        <div class="mt-0">
          <a
            :href="link"
            target="_blank"
            class="inline-flex items-center gap-1 text-xs text-gray-500 underline"
          >
            <ArrowTopRightOnSquareIcon class="w-4" />
            Veure dades al visor</a
          >
        </div>
      </div>
      <div class="flex flex-shrink items-center gap-2">
        <!-- <input
          v-if="isCSV"
          type="file"
          name="file"
          class="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20"
        /> -->
        <button
          class="ot-btn group relative"
          @click="importIndicator(indicator)"
          :disabled="loading"
        >
          <LoadingSpinner
            :loading="loading"
            class="inset-0"
            bg-color-class=""
            border-class="h-6 w-6 group-hover:border-white border-primary border-2"
          />
          <span :class="{ 'opacity-0': loading }" class="transition-opacity"
            >Importar</span
          >
        </button>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <div class="text-xl font-semibold">
          {{
            new Date(indicator.mostRecentDate).toLocaleDateString(undefined, {
              year: "2-digit",
              month: "2-digit",
              day: "numeric",
            })
          }}
        </div>
        <div class="text-xs text-gray-500">Última importació</div>
      </div>
      <div>
        <div class="text-xl font-semibold">
          {{ indicator.municipalityCount }}
        </div>
        <div class="text-xs text-gray-500">Municipis disponibles</div>
      </div>
      <div>
        <div class="text-xl font-semibold">
          {{ indicator.lastYearAvailable }}
        </div>
        <div class="text-xs text-gray-500">
          Últim any de {{ indicator.yearCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import useRunETL from "@/functions/useRunETL";
import { useToast } from "vue-toast-notification";
import indicators from "@/utils/indicators";

const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

const $toast = useToast();

const props = defineProps({
  indicator: {
    type: Object,
    default: () => ({}),
  },
});

const { indicator } = toRefs(props);

const target = computed(() => indicator.value.target);

const { data: data, loading: loading, error: error, loadData } = useRunETL();

const isCSV = computed(() => {
  return indicators[indicator.value.indicator_id] === "CSV";
});

const link = computed(() => {
  const sdg = target.value.sdg;
  const targetId = target.value.id;
  const indicatorId = indicator.value.id;
  // construct the link to the visor. the Municipi ID is hardcoded for now, the rest needs to be dynamic
  // http://localhost:5173/#/municipi/242/ods/8/fita/11/indicador/17
  return `${frontendUrl}municipi/08019/${sdg}/indicadors/${targetId}/${indicatorId}`;
});

async function importIndicator() {
  // console.log("importing", indicator.value.indicator_id);

  await loadData(indicator.value.indicator_id);
  if (error.value) {
    $toast.error(error.value.response.data.error);
    return;
  }
  $toast.success(data.value.status);
  console.log(data.value);
}
</script>
