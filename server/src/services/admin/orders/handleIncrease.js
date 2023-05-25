const db = require("../../../models");

exports.handleIncrease = async (order_items_id) => {
  try {
    // Tăng số lượng trong order_items
    const getCurrentQuantity = await db.Order_Item.findOne({
      where: {
        id: order_items_id,
      },
      attributes: ["quantity"],
      raw: true,
    });

    const response = await db.Order_Item.update(
      { quantity: Number(getCurrentQuantity.quantity) + 1 },
      {
        where: {
          id: order_items_id,
        },
      }
    );

    // Tăng tổng tiền
    const [increase_data] = await db.sequelize.query(`
          select
              order_items.id as 'order_items_id',
              order_details.id as 'order_details_id',
              order_details.total as 'total_money',
              products.price as 'price_product',
              products.discount as 'discount_product'
          from
              order_items
              left join products on products.id = order_items.product_id
              left join order_details on order_details.id = order_items.order_detail_id
          where
              order_items.id = ${order_items_id};
      `);

    const order_details_id = increase_data[0].order_details_id;
    const total = increase_data[0].total_money;
    const price = increase_data[0].price_product;
    const discount = increase_data[0].discount_product;

    const newTotalMoney =
      total + (price - price * ((discount ? discount : 0) / 100));

    const updateTotal = await db.Order_Detail.update(
      { total: newTotalMoney },
      {
        where: { id: order_details_id },
      }
    );

    return {
      err: updateTotal ? 0 : 1,
      msg: updateTotal ? "Update data successfully" : "Update data failed",
    };
  } catch (error) {
    return error;
  }
};
