import useLoadData from "@/functions/useLoadData";
import { watch } from "vue";
import { useI18n } from "vue-i18n";

export default function useLoadLabels(loadOnMount = true) {
  // function to get labels from the server
  const { data: labels, loadData: getLabels } = useLoadData(
    "getLabels",
    {},
    loadOnMount,
  );

  // post labels (and get the new ones as a responsex)
  const { data: updatedLabels, loadData: postLabels } = useLoadData(
    "postLabels",
    {},
    false,
  );

  // globally change the language messages for current lang
  const i18n = useI18n();

  const locale = computed(() => {
    return i18n.locale.value;
  });

  watch(labels, updateLocales);
  watch(updatedLabels, updateLocales);

  function updateLocales(labels) {
    console.log("updateLocales", labels);
    if (labels) i18n.messages.value[locale.value] = labels;
  }

  // utility function to get a nested object from a path
  function convertToHierarchy(path, value) {
    // path is like this: SDGS.1.TARGETS.1.INDICATORS.1.TITLE
    // we want to convert it to this: { SDGS: { 1: { TARGETS: { 1: { INDICATORS: { 1: { TITLE: value } } } } } } }
    const keys = path.split(".");
    const result = {};
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    return result;
  }

  return { labels, getLabels, locale, postLabels, convertToHierarchy };
}
