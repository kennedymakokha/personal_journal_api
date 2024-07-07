"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('db_journal', 'kennedy', 'my_secure_password', {
    host: 'localhost',
    dialect: 'postgres'
});
exports.default = sequelize;
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));
