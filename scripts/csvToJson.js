const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2); // Skip the first two elements
const lang = args[0] || "en"; // Store language code
const filenameCsv = `${lang}.csv`;

const csv = fs.readFileSync(path.resolve(__dirname, `./${filenameCsv}`), {
  encoding: "utf8",
  flag: "r",
});

async function CSVtoJSON(csv, options = {}) {
  const { includeConfig = false } = options;

  const d3 = await import("d3");

  const rows = d3.csvParse(csv);

  const result = {};

  rows.reduce((acc, row) => {
    const keys = row.key.split(".");

    let currentLevel = acc;

    keys.forEach((key, index) => {
      // If it's the last key, set the value
      if (index === keys.length - 1) {
        // if key is an array
        if (key.endsWith("[]")) {
          const processedKey = key.slice(0, -2);
          if (!currentLevel[processedKey]) currentLevel[processedKey] = [];
          currentLevel[processedKey].push(
            includeConfig
              ? {
                  value: row.value,
                  config: JSON.parse(config),
                }
              : row.value
          );
        } else {
          currentLevel[key] = includeConfig
            ? {
                value: row.value,
                config: row.config ? JSON.parse(config) : {},
              }
            : row.value;
        }
      }
      // If not the last but path already exists, go down path
      else if (currentLevel[key]) currentLevel = currentLevel[key];
      // Otherwise start a new path
      else {
        currentLevel[key] = {};
        currentLevel = currentLevel[key];
      }
    });

    return result;
  }, result);

  saveFile(result);
}

CSVtoJSON(csv).catch(console.error);

function saveFile(object) {
  const filename = `${lang}.json`;

  const text = JSON.stringify(object);

  fs.writeFile(path.resolve(__dirname, filename), text, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}
