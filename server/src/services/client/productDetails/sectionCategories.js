const db = require("../../../models");

exports.sectionCategories = async () => {
  try {
    const response = await db.Category.findAll({
      attributes: ["name", "link"],
      raw: true,
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failure",
      data: response ? response : null,
    };
  } catch (error) {
    return error;
  }
};
