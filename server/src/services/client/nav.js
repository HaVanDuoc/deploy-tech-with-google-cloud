const db = require("../../models");

exports.getNav = async () => {
  try {
    const query = `select
                        id,
                        categoryId,
                        name,
                        illustration,
                        link,
                        accessTime
                    from
                        categories
                    order by
                        accessTime;`;

    const [response] = await db.sequelize.query(query);

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failed",
      data: response,
    };
  } catch (error) {
    return error;
  }
};
