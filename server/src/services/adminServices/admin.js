const db = require("../../models");

exports.listBrand = async () => {
  try {
    const response = await db.Brand.findAll();

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failure",
      data: response,
    };
  } catch (error) {
    return error;
  }
};
