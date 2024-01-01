"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUser = void 0;
const sequelize_1 = require("sequelize");
const connections_db_1 = require("../../utils/connections.db");
exports.AdminUser = connections_db_1.sequelize.define('admin_users', {
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(100), // Adjust the length as needed
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(200),
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING(20), // Adjust the length as needed
        allowNull: false, // Set to true if phone number is optional
    },
    company: {
        type: sequelize_1.DataTypes.STRING(100), // Adjust the length as needed
        allowNull: true, // Set to true if company is optional
    },
    address: {
        type: sequelize_1.DataTypes.STRING(200), // Adjust the length as needed
        allowNull: true, // Set to true if address is optional
    },
    city: {
        type: sequelize_1.DataTypes.STRING(100), // Adjust the length as needed
        allowNull: true, // Set to true if city is optional
    },
    is_public: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Assuming the user is public by default, you can adjust as needed
    },
}, {
    timestamps: false,
});
