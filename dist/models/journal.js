"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("./../database"));
class Journal extends sequelize_1.Model {
}
Journal.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    content: {
        type: new sequelize_1.DataTypes.STRING(1024),
        allowNull: false,
    },
    category: {
        type: new sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdBy: {
        type: new sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    deletedAt: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'journals',
    sequelize: database_1.default, // passing the `sequelize` instance is required
});
exports.default = Journal;
