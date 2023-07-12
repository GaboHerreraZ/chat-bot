const getButton = (title) => {
  return {
    type: "reply",
    reply: {
      title,
    },
  };
};

const getTextWithButtons = (headerTitle, bodyTitle, buttons) => {
  return {
    type: "button",
    header: {
      type: "text",
      text: headerTitle,
    },
    body: {
      text: bodyTitle,
    },
    action: {
      buttons,
    },
  };
};

const getContainerList = (headerTitle, bodyTitle, footerTitle) => {
  return {
    header: {
      type: "text",
      text: headerTitle,
    },
    body: {
      text: bodyTitle,
    },
    footer: {
      text: footerTitle,
    },
  };
};

const getRowsSection = (id, title, description = null) => {
  return {
    id,
    title,
    description,
  };
};

const getSectionList = (sectionTitle, rows) => {
  return {
    title: sectionTitle,
    rows,
  };
};

const getList = ({
  headerTitle,
  bodyTitle,
  footerTitle,
  buttonTitle,
  sections,
}) => {
  return {
    type: "list",
    ...getContainerList(headerTitle, bodyTitle, footerTitle),
    action: {
      button: buttonTitle,
      sections,
    },
  };
};

//? TODO: Pendiente por hacer ADRIAN -> Retorna objeto de imagen
const getMediaImage = () => {};

//? TODO: Pendiente por hacer ADRIAN -> Retorna objeto para mostrar video
const getMediaVideo = () => {};

const getLocation = ({ longitude, latitude, name, address }) => {
  return {
    type: "location",
    location: {
      longitude,
      latitude,
      name,
      address,
    },
  };
};

//? TODO: Pendiente por hacer ADRIAN -> Retorna un objeto de tipo product
const getProduct = () => {};

//? TODO: Pendiente por hacer ADRIAN -> Retorna un objeto de tipo lista product
const getProductList = () => {};

module.exports = {
  getButton,
  getTextWithButtons,
  getList,
  getSectionList,
  getRowsSection,
  getMediaImage,
  getMediaVideo,
  getLocation,
  getProduct,
  getProductList,
};
