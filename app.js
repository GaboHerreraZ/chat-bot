const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");

const MetaProvider = require("@bot-whatsapp/provider/meta");
const MockAdapter = require("@bot-whatsapp/database/mock");

const environment = require("./environment");
const { mainFlowTest } = require("./flowTest/flow-test");

const main = async () => {
  const adapterDB = new MockAdapter(); //TODO Cambiar a MongoDb
  const adapterFlow = createFlow([mainFlowTest]);

  const adapterProvider = createProvider(MetaProvider, {
    jwtToken: environment.JWTOKEN,
    numberId: environment.NUMBER_ID,
    verifyToken: environment.VERIFY_TOKEN,
    version: "v17.0",
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
