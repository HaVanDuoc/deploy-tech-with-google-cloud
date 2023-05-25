const db = require("../../../models");

exports.listNav = async () => {
  try {
    const query = `select
                        name,
                        link
                    from
                        categories
                    order by
                        accessTime desc;`;

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
