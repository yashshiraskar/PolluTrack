const aqiService = require("./aqiService");

async function test() {
  const result = await aqiService.generateAQIWithPrediction();
  console.log(result);
}

test();