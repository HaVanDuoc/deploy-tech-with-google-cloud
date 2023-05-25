const db = require("../../../models");

exports.suggest = async (key, limit) => {
  try {
    const query = `SELECT
                          products.id,
                          products.name,
                          products.price,
                          products.discount,
                          products.image,
                          categories.name as 'category',
                          categories.link as 'categoryLink'
                      FROM
                          products
                      LEFT JOIN
                          categories on categories.categoryId = products.categoryId
                      Where
                          products.name LIKE "%${key}%"
                      LIMIT
                          ${limit};`;

    const [result] = await db.sequelize.query(query);

    return {
      err: result ? 0 : 1,
      msg: result ? "Get successfully" : "Get failure",
      data: result ? result : null,
    };
  } catch (error) {
    return error;
  }
};
