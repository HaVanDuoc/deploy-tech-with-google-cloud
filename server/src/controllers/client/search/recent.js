const { intervalServerError } = require("../../../middleware/handleError");
const { recent } = require("../../../services/client/search/recent");

exports.recent = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const limit = req.body.limit;

    const response = await recent(user_id, limit);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
