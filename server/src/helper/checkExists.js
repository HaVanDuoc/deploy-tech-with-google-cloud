const db = require("../models");

exports.CheckUserNameExists = async (userName) => {
  try {
    const { count, data } = await db.User.findAndCountAll({
      where: { userName },
      attributes: ["id", "userName"],
      raw: true,
    });

    return {
      err: count === 0 ? 0 : 1,
      msg:
        count === 0
          ? "Tên người dùng có thể sử dụng"
          : "Tên người dùng đã được sử dụng",
      data: data,
    };
  } catch (error) {
    return error;
  }
};

exports.CheckEmailExists = async (email) => {
  try {
    const { count, data } = await db.User.findAndCountAll({
      where: { email },
      attributes: ["id", "email"],
      raw: true,
    });

    return {
      err: count === 0 ? 0 : 1,
      msg: count === 0 ? "Email có thể sử dụng" : "Email đã được sử dụng",
      data: data,
    };
  } catch (error) {
    return error;
  }
};
