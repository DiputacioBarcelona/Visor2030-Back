export function number(
  val,
  round = 1,
  { abbr = false, decimal = ",", thousand = "." } = {}
) {
  if (typeof val !== "number" || isNaN(val)) return "---";
  // if (isNaN(val) || val === null) return "---";

  let value = val;
  let suffix = "";

  if (abbr) {
    // MILIONS
    if (val >= 1_000_000) {
      value = val / 1_000_000;
      // 0 decimals for multiples of 1M, 2 decimals otherwise.
      round = val % 1_000_000 ? round : round;
      suffix = "M";
      // console.log("here", val, value, round);
    }
    // Ks
    else if (val >= 1000) {
      value = val / 1000;
      // 0 decimals for multiples of 1M, 2 decimals otherwise.
      round = val % 1000 ? round : round;
      suffix = "k";
    }
    // Ks
    else if (val >= 100_000) {
      value = val / 100_000;
      // 0 decimals for multiples of 1M, 2 decimals otherwise.
      round = val % 100_000 ? round : round;
      suffix = "k";
    }
  }

  return (
    value
      .toFixed(round)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1;")
      .replace(/\./g, decimal)
      .replace(/;/g, thousand) + suffix
  );
}
