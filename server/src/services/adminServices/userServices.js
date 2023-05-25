// userServices.js

const { hashPassword } = require("../../helper/hashPassword");
const { padUserId } = require("../../helper/padLeft");
const db = require("../../models");
const { sequelize } = require("../../models");

// Create new user
exports.createNewUser = async (data) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      gender,
      role,
      birthday,
    } = data;

    // Create User Id
    const query = `select userId from users order by id desc limit 1;`;
    const [idUserFinal] = await sequelize.query(query, { raw: true }); // Get uid of user final e.g 'U00000006'
    const sliceId = idUserFinal[0].userId.slice(-8); // get 8 char final to result e.g '00000006'
    const userId = padUserId(parseInt(sliceId) + 1); // parseInt is convert 00000006 to 6

    // kết quả trả về một array [data: object, created: boolean]
    const response = await db.User.findOrCreate({
      where: { email }, // tìm thấy email created=false -> Tài khoản đã tồn tại
      // Ko tìm thấy dữ liệu -> created=true -> tạo dữ liệu mới theo defaults -> Đăng ký thành công
      defaults: {
        userId,
        firstName,
        middleName,
        lastName,
        email,
        password: hashPassword(password),
        phoneNumber,
        address,
        dateOfBirth: birthday,
        genderCode: gender,
        roleId: role,
      },
      raw: true, // chuyển instants thành object json
    });

    return {
      err: response[1] ? 0 : 1,
      msg: response[1] ? "Create successfully" : "Email đã được đăng ký",
      data: response[1] ? response[0] : null,
    };
  } catch (error) {
    return error;
  }
};

// Get list users
exports.getAllUser = async () => {
  try {
    const query = `SELECT
                        users.id,
                        userId,
                        firstName,
                        middleName,
                        lastName,
                        userName,
                        email,
                        avatar,
                        dateOfBirth,
                        transactionVolume,
                        statuses.name as 'status',
                        roles.name as "role"
                    FROM
                        users
                        left join statuses on users.statusId = statuses.statusId
                        left join roles on users.roleId = roles.roleId;`;

    const [response] = await sequelize.query(query, { raw: true });

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failed",
      data: response,
    };
  } catch (error) {
    return error;
  }
};

// Get user
exports.getUser = async (userId) => {
  try {
    const query = `SELECT
                        users.id,
                        userId,
                        firstName,
                        middleName,
                        lastName,
                        userName,
                        email,
                        password,
                        avatar,
                        dateOfBirth,
                        phoneNumber,
                        address,
                        transactionVolume,
                        genders.name as 'gender',
                        statuses.name as 'status',
                        roles.name as "role"
                    FROM
                        users
                        left join statuses on users.statusId = statuses.statusId
                        left join roles on users.roleId = roles.roleId
                        left join genders on users.genderCode = genders.code
                    WhERE
                        userId = "${userId}"
                    LIMIT
                        1;`;

    const [response] = await sequelize.query(query, { raw: true });

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failed",
      data: response[0],
    };
  } catch (error) {
    return error;
  }
};

// Update user
exports.updateUser = async (userId, data) => {
  try {
    if (data.password) {
      data.password = hashPassword(data.password);
    }

    response = await db.User.update(data, {
      where: { userId },
      raw: true,
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "Cập nhật thành công" : "Cập nhật thất bại",
      data: response[0],
    };
  } catch (error) {
    return error;
  }
};

// Delete user
exports.deleteUser = async (userId) => {
  try {
    const response = await db.User.destroy({
      where: { userId },
      raw: true,
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "Đã xóa" : "Xóa thất bại",
      data: response,
    };
  } catch (error) {
    return error;
  }
};

// Get list roles
exports.getListRole = async (data) => {
  try {
    const response = await db.Role.findAll({
      attributes: ["id", "roleId", "name"],
      raw: true,
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failed",
      data: response,
    };
  } catch (error) {
    return error;
  }
};
