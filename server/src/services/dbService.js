// authService.js

const db = require("../models");
const { sequelize } = require("../models");

exports.ListTables = async () => {
  try {
    const [response] = await sequelize.query("SHOW tables");

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failure",
      data: response,
    };
  } catch (error) {
    return error;
  }
};

exports.getGender = async () => {
  try {
    const response = await db.Gender.findAll(
      { attributes: { exclude: ["createdAt", "updatedAt"] } },
      { raw: true }
    );

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failure",
      data: response,
    };
  } catch (error) {
    return error;
  }
};

exports.listRole = async () => {
  try {
    const response = await db.Role.findAll(
      { attributes: { exclude: ["createdAt", "updatedAt"] } },
      { raw: true }
    );

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failure",
      data: response,
    };
  } catch (error) {
    return error;
  }
};

exports.statusAccount = async () => {
  try {
    const response = await db.Status.findAll(
      { attributes: { exclude: ["createdAt", "updatedAt"] } },
      { raw: true }
    );

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failure",
      data: response,
    };
  } catch (error) {
    return error;
  }
};

// List Category
exports.listCategory = async () => {
  try {
    const response = await db.Category.findAll(
      { attributes: { exclude: ["createdAt", "updatedAt"] } },
      { raw: true }
    );

    return {
      err: response ? 0 : 1,
      msg: response ? "Get data successfully" : "Get data failure",
      data: response,
    };
  } catch (error) {
    return error;
  }
};
