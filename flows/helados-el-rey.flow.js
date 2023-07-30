const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const Core = require("../core/core");
const { getRowsSection, getSectionList } = require("../utils/getElements");
const { delay } = require("../utils/util");

const locationFlow = addKeyword("##__LOCATION_##").addAnswer(
  "Estamos ubicados en:",
  null,
  async (ctx, { provider }) => {
    const core = new Core(ctx, provider);
    const body = {
      longitude: -73.83894,
      latitude: 7.0644,
      name: "Helados el Rey",
      address: "Cl 54 # 36 e 95",
    };

    await delay(200);
    await core.sendLocation(body);
  }
);

const FLOWS = {
  locationId: {
    action: locationFlow,
  },
};

const informationFlow = addKeyword("##_INFORMATION_##")
  .addAnswer("¿En que está intersad@?", null, async (ctx, { provider }) => {
    const core = new Core(ctx, provider);
    const rowInformation = [
      getRowsSection(
        "product-id",
        "*Productos*",
        "Todos nuestros productos disponibles"
      ),
      getRowsSection(
        "precio-id",
        "*Precios*",
        "Precio de productos disponibles"
      ),
      getRowsSection(
        "locationId",
        "*Ubicación*",
        "Dirección del punto de atención"
      ),
      getRowsSection(
        "realizarPedido-id",
        "*Realizar Pedido*",
        "Realiza un pedido"
      ),
      getRowsSection("salid-id", "*Salir*", "Terminar conversación"),
    ];

    const sections = [getSectionList("Section 1", rowInformation)];

    const body = {
      headerTitle: "Lista de Servicios",
      bodyTitle: "*Helados el Rey 👑 *",
      footerTitle: "😃",
      buttonTitle: "Opciones",
      sections,
    };
    core.sendList(body);
  })
  .addAnswer(
    "😎 👑 ",
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic }) => {
      const flowSelected = FLOWS[ctx.body]?.action;
      if (!flowSelected) {
        await flowDynamic("Por favor, seleccione una opción del listado");
        await delay(200);
        await gotoFlow(informationFlow);
        return;
      }

      await gotoFlow(flowSelected);
    }
  );

const welcomeFlow = addKeyword(EVENTS.WELCOME).addAnswer(
  ["Hola, ¿Como estás?", "Para *Helados el Rey 👑* es un placer atenderte"],
  null,
  async (_, { gotoFlow }) => {
    await gotoFlow(informationFlow);
  }
);

module.exports = {
  welcomeFlow,
  informationFlow,
  locationFlow,
};
