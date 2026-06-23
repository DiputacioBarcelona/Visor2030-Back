const accentsMap = {
  a: "á|à|ã|â|À|Á|Ã|Â",
  e: "é|è|ê|É|È|Ê",
  i: "í|ì|î|Í|Ì|Î",
  o: "ó|ò|ô|õ|Ó|Ò|Ô|Õ",
  u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
  c: "ç|Ç",
  n: "ñ|Ñ",
};

export const slugify = (text) =>
  Object.keys(accentsMap)
    .reduce(
      (acc, cur) => acc.replace(new RegExp(accentsMap[cur], "g"), cur),
      text?.toLowerCase() || ""
    )
    .trim()
    .replace(/ +(?= )/g, "");

export function trailingZero(num) {
  return num < 10 ? "0" + num : "" + num;
}

export function urlSafe(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();
}

export function num(num) {
  return +num.replace(",", ".");
}

export function removeNulls(data) {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (!data[key]) delete data[key];
    }
  }
  return data;
}
