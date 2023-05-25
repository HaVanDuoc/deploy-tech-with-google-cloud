const db = require("../../../models");

exports.setView = async (brand) => {
  try {
    const [currentView] = await db.sequelize.query(
      `select view from brands where name = "${brand}"`
    );

    const newView = 1 + Number(currentView[0].view || 0);

    // update
    const update = await db.Brand.update(
      { view: newView },
      { where: { name: brand } }
    );

    return {
      err: update ? 0 : 1,
      msg: update ? "Update successfully" : "Update failure",
    };
  } catch (error) {
    return error;
  }
};
