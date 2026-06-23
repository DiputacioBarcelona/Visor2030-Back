import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";

import api from "@/services/data";

export default function useLoadData(
  endpoint = "getData",
  initialValue = [],
  loadOnMount = true,
) {
  const data = ref(initialValue);
  const loading = ref(false);
  const error = ref(null);

  const route = useRoute();

  const loadData = async (postData) => {
    // always reset to avoid unexpected results
    data.value = initialValue;
    let timeout;
    try {
      // activate the loading status after 200ms
      timeout = setTimeout(() => (loading.value = true), 200);

      const result = await api[endpoint](route.params, route.query, postData);

      data.value = result;

      error.value = false;
    } catch (err) {
      error.value = err;
      console.error(err);
    } finally {
      loading.value = false;
      clearTimeout(timeout);
    }
  };

  onMounted(() => {
    loadOnMount && loadData();
  });

  // watch(
  //   () => route.name,
  //   () => {
  //     loadData();
  //   },
  // );

  return {
    data,
    loading,
    error,
    loadData,
  };
}
