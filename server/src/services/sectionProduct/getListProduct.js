const db = require("../../models");

exports.getListProduct = async (data) => {
  try {
    const { category } = data;

    const query = `SELECT
                            products.id,
                            products.productId,
                            products.name,
                            products.image,
                            products.price,
                            products.rating,
                            products.discount,
                            products.view,
                            products.stock,
                            products.isActive,
                            categories.name as 'category',
                            brands.name as 'brand'
                        FROM
                            products
                            LEFT JOIN categories on products.categoryId = categories.categoryId
                            LEFT JOIN brands on products.brandId = brands.brandId
                        WHERE
                            categories.name = "${category}";`;

    const [response] = await db.sequelize.query(query);

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failure",
      data: response,
    };
  } catch (error) {
    return error;
  }
};
