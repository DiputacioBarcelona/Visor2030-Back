const fs = require("fs");
const path = require("path");
const { flattenJson } = require("./flattenJson.js");

const args = process.argv.slice(2); // Skip the first two elements
const lang = args[0] || "en"; // Store language code
const filename = `${lang}.csv`;

async function convertJsonToCsv() {
  const d3 = await import("d3");

  // read locale keys from json
  const filePath = path.resolve(__dirname, `../src/locales/${lang}.json`);
  const jsonData = fs.readFileSync(filePath, "utf8");

  const textObject = JSON.parse(jsonData);

  // convert to csv
  const csv = d3.csvFormat(flattenJson(textObject));

  // write to file
  fs.writeFileSync(path.resolve(__dirname, filename), csv);
}

// Call the async function
convertJsonToCsv().catch(console.error);
