require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const MetaProvider = require("@bot-whatsapp/provider/meta");
const MockAdapter = require("@bot-whatsapp/database/mock");

const { mainFlowTest, userInfoFlowTest } = require("./flowTest/flow-test");
const ChatDatabase = require("./database/chat-database");

const main = async () => {
  //adpter fake
  const adapterDB = new MockAdapter();

  // chat bot database
  const chatBotDatabase = new ChatDatabase();
  chatBotDatabase.connectToChatDatabase();

  const adapterFlow = createFlow([userInfoFlowTest(chatBotDatabase)]);

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
