const db = require("../../../models");

exports.deleteCartItem = async (data) => {
  try {
    const response = await db.Cart_Item.destroy({
      where: {
        product_id: data.product_id,
        cart_session_id: data.cart_session_id,
      },
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "Delete data successfully" : "Delete data failed",
      data: response ? response : null,
    };
  } catch (error) {
    return error;
  }
};
