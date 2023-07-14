require('dotenv').config()
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");

const MetaProvider = require("@bot-whatsapp/provider/meta");
const MockAdapter = require("@bot-whatsapp/database/mock");

const { mainFlowTest } = require("./src/flowTest/flow-test");

const main = async () => {
  const adapterDB = new MockAdapter(); //TODO Cambiar a MongoDb
  const adapterFlow = createFlow([mainFlowTest]);

  const adapterProvider = createProvider(MetaProvider, {
    jwtToken: process.env.JWTOKEN,
    numberId: process.env.NUMBER_ID,
    verifyToken: process.env.VERIFY_TOKEN,
    version: "v17.0",
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
