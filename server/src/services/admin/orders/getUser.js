const db = require("../../../models");

exports.getUser = async (user_id) => {
  try {
    const [user] = await db.sequelize.query(`
        SELECT
          users.id,
          users.userId,
          users.avatar,
          rtrim(
              ltrim(
                  concat(
                      ifnull(users.firstName, ''),
                      ' ',
                      ifnull(users.middleName, ''),
                      ' ',
                      users.lastName
                  )
              )
          ) as fullName,
          users.dateOfBirth,
          genders.name as 'gender',
          users.email,
          users.phoneNumber,
          users.address
      FROM
          users
          left join genders on genders.code = users.genderCode
      where
          users.id = ${user_id}
    `);

    return {
      err: user ? 0 : 1,
      msg: user ? "Get data successfully" : "Get data failure",
      data: user ? user[0] : null,
    };
  } catch (error) {
    return error;
  }
};
