const { Sequelize } = require("sequelize");

const database = process.env.DATABASE;
const username = process.env.USER;
const password = process.env.PASSWORD;
const instance = process.env.INSTANCE;

const sequelize = new Sequelize(database, username, password, {
  host: instance,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    socketPath: instance,
  },
});

try {
  sequelize.authenticate();
  console.log(`Kết nối CSDL ${database} thành công...`);
} catch (error) {
  console.error("Kết nối CSDL thất bại:", error);
}
