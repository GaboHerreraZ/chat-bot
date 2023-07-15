const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const Core = require("../core/core");
const {
  getButton,
  getRowsSection,
  getSectionList,
  getMediaImage
} = require("../utils/getElements");

const buttonsFlowTest = addKeyword("Botones").addAction(
  async (ctx, { provider }) => {
    const core = new Core(ctx, provider);
    const buttons = [
      getButton("Botón 1"),
      getButton("Botón 2"),
      getButton("Botón 3"),
    ];
    
    await core.sendButtons("Header Titulo", "Body Titulo", buttons);
  }
);

const interactiveListFlowTest = addKeyword("Lista Interactiva").addAction(
  async (ctx, { provider }) => {
    const core = new Core(ctx, provider);

    const rowsSection1 = [
      getRowsSection("section-1-1", "Row Title 1", "Row Description 1"),
      getRowsSection("section-1-2", "Row Title 2", "Row Description 2"),
      getRowsSection("section-1-3", "Row Title 3", "Row Description 3"),
    ];

    const rowsSection2 = [
      getRowsSection("section-2-1", "Row Title 1", "Row Description 1"),
      getRowsSection("section-2-2", "Row Title 2", "Row Description 2"),
      getRowsSection("section-2-3", "Row Title 3", "Row Description 3"),
    ];

    const rowsSection3 = [
      getRowsSection("section-3-1", "Row Title 1", "Row Description 1"),
      getRowsSection("section-3-2", "Row Title 2", "Row Description 2"),
      getRowsSection("section-3-3", "Row Title 3", "Row Description 3"),
    ];

    const sections = [
      getSectionList("Section 1", rowsSection1),
      getSectionList("Section 2", rowsSection2),
      getSectionList("Section 3", rowsSection3),
    ];

    const body = {
      headerTitle: "Header Title",
      bodyTitle: "Body Title",
      footerTitle: "Footer Title",
      buttonTitle: "Buttons Title",
      sections,
    };

    await core.sendList(body);
  }
);

const locationFlowTest = addKeyword("Ubicación").addAction(
  async (ctx, { provider }) => {
    const core = new Core(ctx, provider);

    const body = {
      longitude: -73.83894,
      latitude: 7.0644,
      name: "Helados el Rey",
      address: "Cl 54 # 36 e 95",
    };

    const response = await core.sendLocation(body);
  }
);

const imagenFlowTest = addKeyword('Imagen').addAction(
  async (ctx, {provider}) => {
    const core = new Core(ctx, provider);

    const url = 'https://scontent-bog1-1.xx.fbcdn.net/v/t39.30808-6/228239063_2874901096092476_2965143385145891036_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=sACEWg5OnLkAX_LJSFU&_nc_ht=scontent-bog1-1.xx&oh=00_AfBOp545tFMlBSNLgvOA2_FIyqY07zSq1wsJhNPtexVZfg&oe=64B5E94E'

    await core.sendImage(url)

  }
)

const imageWithText = addKeyword('imgTxt').addAction(
  async (ctx, {provider}) => {
    const core = new Core(ctx, provider);
    const url = 'https://scontent-bog1-1.xx.fbcdn.net/v/t39.30808-6/228239063_2874901096092476_2965143385145891036_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=sACEWg5OnLkAX_LJSFU&_nc_ht=scontent-bog1-1.xx&oh=00_AfBOp545tFMlBSNLgvOA2_FIyqY07zSq1wsJhNPtexVZfg&oe=64B5E94E'

    await core.interactiveList(url)

  }
)

const mainFlowTest = addKeyword(EVENTS.WELCOME).addAnswer(
  [
    "Hola,",
    "A continuación puedes ver un ejemplo de todas las funcionalidades de este bot:",
    "⏩ *Botones*",
    "⚛ *Lista Interactiva*",
    "🛄 *Ubicación*",
    "🖼️ *Imagen*",
    "🎟️ *imgTxt*"
  ],
  {
    capture: true,
  },
  null,
  [buttonsFlowTest, interactiveListFlowTest, locationFlowTest, imagenFlowTest,imageWithText]
);

module.exports = {
  mainFlowTest,
};
