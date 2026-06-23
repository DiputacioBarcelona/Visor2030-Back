function flattenJson(json) {
  // turn hierarchical object into an array of objects where each leaf is an object
  // key is the path connected by dots

  const result = [];

  const traverse = (obj, path = []) => {
    Object.keys(obj).forEach((key) => {
      const newPath = [...path, key];

      if (Array.isArray(obj[key])) {
        obj[key].forEach((value) => {
          // add array syntax []
          const newKey = newPath.join(".") + "[]";
          result.push({
            key: newKey,
            value: value,
          });
        });
      } else if (typeof obj[key] === "string") {
        result.push({
          key: newPath.join("."),
          value: obj[key],
        });
      } else {
        traverse(obj[key], newPath);
      }
    });
  };

  traverse(json);

  return result;
}

module.exports = { flattenJson };
