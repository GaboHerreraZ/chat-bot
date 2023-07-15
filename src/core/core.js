const { text } = require("body-parser");
const {
  getTextWithButtons,
  getList,
  getLocation,
} = require("../utils/getElements");

class Core {
  #provider = undefined;
  #number = null;

  constructor(ctx, _provider = null) {
    this.#provider = _provider;
    this.#number = ctx.from;
  }

  async sendButtons(headerTitle, bodyTitle, buttons) {
    const parseButtons = buttons.map((btn, i) => ({
      ...btn,
      reply: { id: `btn-${i}`, ...btn.reply },
    }));

    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: this.#number,
      type: "interactive",
      interactive: getTextWithButtons(headerTitle, bodyTitle, parseButtons),
    };

    return this.#provider.sendMessageMeta(body);
  }

  async sendList(listContainer) {
    const list = getList(listContainer);
    return this.#provider.sendLists(this.#number, list);
  }

  async sendLocation(location) {
    const body = {
      messaging_product: "whatsapp",
      to: this.#number,
      ...getLocation(location),
    };

    return this.#provider.sendMessageMeta(body);
  }

  async sendImage(url) {
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: this.#number,
      type: "image", 
      image: {
        link : url
      }
    }

    return this.#provider.sendMessageMeta(body)
  }

}

module.exports = Core;
