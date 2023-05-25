const db = require("../../../models");

exports.getListProducts = async (page) => {
  try {
    const limit = 3;
    const offset = (page - 1) * limit;

    const [amount] = await db.sequelize.query(
      `select count(*) as 'count' from products`
    );

    const response = await db.Product.findAll({
      attributes: [
        "id",
        "productId",
        "image",
        "name",
        "price",
        "stock",
        "isActive",
      ],
      limit,
      offset,
    });

    return {
      limit: limit ? limit : 1,
      all: amount ? amount[0].count : null,
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failure",
      data: response,
    };
  } catch (error) {
    return error;
  }
};
