<template>
  <div class="ot-container">
    <div class="mb-8 flex items-center justify-between">
      <h1 class="ot-title-1 mb-0"><OTText value="INDICATORS" /></h1>
      <a
        class="ot-btn ot-btn-soft gap-2 px-4 py-2"
        :href="`${basePath}export/indicators`"
      >
        <ArrowDownTrayIcon class="h-5 w-5" />
        <OTText value="Descarrega resum" />
      </a>
    </div>
    <!-- bg-sdg-1 bg-sdg-2 bg-sdg-3 bg-sdg-4 bg-sdg-5 bg-sdg-6 bg-sdg-7 bg-sdg-8 bg-sdg-9 bg-sdg-10 bg-sdg-11 bg-sdg-12 bg-sdg-13 bg-sdg-14 bg-sdg-15 bg-sdg-16 bg-sdg-17
       focus:ring-sdg-1/30 focus:ring-sdg-2/30 focus:ring-sdg-3/30 focus:ring-sdg-4/30 focus:ring-sdg-5/30 focus:ring-sdg-6/30 focus:ring-sdg-7/30 focus:ring-sdg-8/30 focus:ring-sdg-9/30 focus:ring-sdg-10/30 focus:ring-sdg-11/30 focus:ring-sdg-12/30 focus:ring-sdg-13/30 focus:ring-sdg-14/30 focus:ring-sdg-15/30 focus:ring-sdg-16/30 focus:ring-sdg-17/30 -->

    <div class="flex items-start justify-between gap-4">
      <input
        type="search"
        v-model="query"
        class="ot-input w-96 text-xl"
        placeholder="Cerca per indicador o fita"
      />
      <div
        class="flex items-center gap-2 rounded-md border border-primary bg-primary/10 p-4 py-1"
      >
        <div class="text-sm"><OTText value="Total d'indicadors" />:</div>
        <div class="w-10 text-3xl font-bold">{{ filtered.length }}</div>
      </div>
    </div>

    <div v-if="loading" class="relative h-20">
      <LoadingSpinner
        :loading="loading"
        class="inset-0"
        bg-color-class="bg-white"
        border-class="h-6 w-6 border-black border-2"
      />
    </div>

    <!-- <div class="divide-y-4">
      <div v-for="sdg in sdgs" class="py-8">
        <h2 class="ot-title-2 inline-flex items-center gap-2">
          <span
            :class="{
              [`bg-sdg-${sdg[0]}`]: true,
            }"
            class="inline-flex w-12 flex-shrink-0 items-center justify-center rounded-full p-1 text-white"
            >{{ sdg[0] }}</span
          >
          <OTText :value="`SDGS.${sdg[0]}.TITLE`" />
        </h2>
        <div class="space-y-12">
          <div v-for="target in sdg[1]" class="">
            <h3 class="ot-title-3 mb-4 items-baseline">
              <span
                :class="{
                  [`bg-sdg-${sdg[0]}`]: true,
                }"
                class="inline-flex w-12 flex-shrink-0 items-center justify-center rounded-full p-1 text-white"
                >{{ target[0] }}</span
              >
              <OTText
                :value="`SDGS.${sdg[0]}.TARGETS.${target[0].split('.')[1]}.DESCRIPTION`"
              />
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <IndicatorCard
                v-for="indicator in target[1]"
                :indicator="indicator"
              />
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="my-8">
      <OTTable
        :columns="columns"
        :rows="tableData"
        :items-per-page="100"
        default-sort="indicator_id"
        row-class="indicator-table"
      >
        <template #indicator_id="row">
          <div class="flex items-center gap-2">
            <div
              class="flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
              :class="{ [`bg-sdg-${row.indicator_id.split('.')[0]}`]: true }"
            >
              {{ row.indicator_id.split(".")[0] }}
            </div>
            <div class="rounded bg-gray-100 px-1 tabular-nums tracking-tighter">
              {{ row.indicator_id }}
            </div>
          </div>
        </template>
        <template #actions="row">
          <div class="inline-flex items-center gap-2">
            <RouterLink
              :to="{
                name: 'indicator',
                params: { id: row.id },
                query: route.query,
              }"
              class="ot-btn ot-btn-soft"
            >
              <PencilSquareIcon class="h-5 w-5" />
            </RouterLink>

            <a
              class="ot-btn ot-btn-soft"
              :href="`${basePath}export/csv?id=${row.indicator_id}`"
            >
              <ArrowDownTrayIcon class="h-5 w-5" />
            </a>
          </div>
        </template>
        <template #mostRecentDate="{ mostRecentDate }"
          >{{
            new Date(mostRecentDate).toLocaleDateString(undefined, {
              year: "2-digit",
              month: "2-digit",
              day: "numeric",
            })
          }}
        </template>
        <template #weight="{ weight, indicator_id }"
          ><span
            :class="
              sdgWeights[indicator_id.split('.')[0]] === 100
                ? 'text-green-500'
                : 'text-red-500'
            "
            >{{ weight }}%</span
          ></template
        >
        <template #sign="{ sign }">{{ sign ? "Positiu" : "Negatiu" }}</template>
        <template #calculation="{ calculation }">{{
          calculation === "simple"
            ? "Simple"
            : calculation === "ratio"
              ? "Ratio"
              : "Diferència"
        }}</template>
      </OTTable>
    </div>

    <OTModal :is-open="showModal" @close="closeModal">
      <template #body>
        <RouterView />
      </template>
    </OTModal>

    <!-- <pre class="ot-code">{{ sdgWeights }}</pre> -->
    <!-- <pre class="ot-code">{{ i18n.messages }}</pre>
    <pre class="ot-code">{{ sdgs }}</pre> -->
  </div>
</template>

<script setup>
import useLoadData from "@/functions/useLoadData";
import useFilters from "@/functions/useFilters";
import useLoadLabels from "@/functions/useLoadLabels";

import colors from "@/utils/colors";
import * as d3 from "d3";
import { useI18n } from "vue-i18n";
import { PencilSquareIcon, ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import { useRoute, useRouter } from "vue-router";

const basePath = import.meta.env.VITE_API_URL || "http://localhost:8000/";

const route = useRoute();
const router = useRouter();

// instantiate useI18n
const i18n = useI18n();

const { data, loading, error, loadData } = useLoadData("getIndicators");

// initial load text labels globally
const { labels } = useLoadLabels();

provide("labels", labels);

const { query } = useFilters();

// the name of the indicator or the target are actually in the translation files
const filtered = computed(() => {
  const messages = i18n.messages.value[i18n.locale.value];
  return (data.value.member || []).filter((d) => {
    // look into messages at locale and see if the key exists
    const indicator =
      messages.SDGS[d.target.sdg]?.TARGETS[d.target.target_id.split(".")[1]]
        ?.INDICATORS[d.indicator_id.split(".")[2]]?.TITLE;

    const target =
      messages.SDGS[d.target.sdg]?.TARGETS[d.target.target_id.split(".")[1]]
        ?.DESCRIPTION;

    const sdg = messages.SDGS[d.target.sdg]?.TITLE;

    const indicatorId = d.indicator_id;

    // ignore accents and other chars
    const queryNormalized = query.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return (
      indicator
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(queryNormalized) ||
      target
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(queryNormalized) ||
      sdg
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(queryNormalized) ||
      indicatorId
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(queryNormalized)
    );
  });
});

const sdgs = computed(() => {
  // sort by indicator id
  const sorted = filtered.value.sort((a, b) => {
    //indicator id can be 10.1.1 and 2.1.1, so we need to split and compare each part. it can also be 5.c.2
    const aId = a.indicator_id
      .split(".")
      .map((d) => {
        const num = Number(d);
        return isNaN(num) ? 9 : num;
      })
      .join("");
    const bId = b.indicator_id
      .split(".")
      .map((d) => {
        const num = Number(d);
        return isNaN(num) ? 9 : num;
      })
      .join("");

    // console.log({ aId, bId });

    return aId - bId;
  });
  return d3.groups(
    sorted,
    (d) => d.target.sdg,
    (d) => d.target.target_id,
  );
});

const columns = [
  {
    id: "indicator_id",
    name: "ID",
    sort: sorting,
  },
  {
    id: "name",
    name: "Nom",
  },
  {
    id: "actions",
    name: "Accions",
  },
  {
    id: "municipalityCount",
    name: "Municipis",
  },
  {
    id: "weight",
    name: "Pes",
  },
  {
    id: "sign",
    name: "Sentit",
  },
  {
    id: "calculation",
    name: "Tipus",
  },
  {
    id: "lastYearAvailable",
    name: "Últim any",
  },
  {
    id: "mostRecentDate",
    name: "Importació",
  },
];

const tableData = computed(() => {
  return filtered.value
    .map((d) => {
      const [sdg, target, indicator] = d.indicator_id.split(".");

      return {
        ...d,
        name: i18n.t(
          `SDGS.${sdg}.TARGETS.${target}.INDICATORS.${indicator}.TITLE`,
        ),
      };
    })
    .sort(sorting);
});

function sorting(a, b) {
  // indicator_id is like 1.2.3. split and compare each part as a number
  const aId = a.indicator_id.split(".").map((d) => Number(d));
  const bId = b.indicator_id.split(".").map((d) => Number(d));
  return aId[0] - bId[0] || aId[1] - bId[1] || aId[2] - bId[2];
}

const showModal = computed(() => {
  return route.name === "indicator";
});

function closeModal() {
  router.push({ name: "home", query: route.query });
  // loadData();
}

// from the data.value.member, group by sdg and sum the weight column
const sdgWeights = computed(() => {
  const sdgWeights = {};
  (data.value.member || []).forEach((d) => {
    const sdg = d.target.sdg;
    if (!sdgWeights[sdg]) {
      sdgWeights[sdg] = 0;
    }
    sdgWeights[sdg] += d.weight;
  });
  return sdgWeights;
});

// watch on route load, loadData
watch(
  () => route.name,
  (newVal, oldVal) => {
    if (newVal === "home" && oldVal === "indicator") {
      loadData();
    }
  },
  { immediate: true },
);
</script>

<style>
.indicator-table td {
  @apply py-2;
}
</style>
