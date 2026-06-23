import { useRoute, useRouter } from "vue-router";
import { removeNulls } from "@/utils/helpers";
import { ref } from "vue";

function useSetQuery() {
  const router = useRouter();
  const route = useRoute();

  const setQuery = (q = {}, page = null) => {
    router.push({
      name: page || route.name,
      query: removeNulls({ ...route.query, ...q }),
    });
  };

  return setQuery;
}

export function useSingleRouteFilter(
  name,
  defaultValue = ref(null),
  type = "string",
) {
  const route = useRoute();
  const setQuery = useSetQuery();

  const filter = computed({
    get: () => {
      if (type === "number") return +route.query[name] || defaultValue.value;
      else return route.query[name] || defaultValue.value;
    },
    set: (value) => setQuery({ [name]: value }),
  });

  return filter;
}

export function useSingleRouteParam(
  name,
  defaultValue = ref(null),
  type = "string",
) {
  const route = useRoute();

  const filter = computed({
    get: () => {
      if (type === "number") return +route.params[name] || defaultValue.value;
      else return route.params[name] || defaultValue.value;
    },
    set: (value) =>
      route.push({
        params: { ...route.params, [name]: value },
        query: route.query,
      }),
  });

  return filter;
}

export function useMultipleRouteFilter(name, defaultValue = ref([])) {
  const route = useRoute();
  const router = useRouter();

  const filter = computed({
    get: () => {
      return route.query[name]?.split(",") || [...defaultValue.value];
    },
    set: (value) => {
      // we can set it to null to remove the filter
      if (value === null) {
        setSegment(name, null);
        return;
      }
      // if it's an array, set it directly
      if (Array.isArray(value)) {
        setSegment(name, value.length ? value.join(",") : null);
        return;
      }
      // otherwise, toggle the value
      const curr = route.query[name]?.split(",") || [...defaultValue.value];

      if (curr.includes(value)) {
        curr.splice(curr.indexOf(value), 1);
      } else {
        curr.push(value);
      }

      setSegment(name, curr?.length ? curr.join(",") : null);
    },
  });

  const setSegment = (name, value) => {
    router.push({ query: removeNulls({ ...route.query, [name]: value }) });
  };

  return filter;
}

export default function useFilters() {
  const setQuery = useSetQuery();

  // example filter:
  const query = useSingleRouteFilter("q", ref(""));

  return { query, setQuery };
}
