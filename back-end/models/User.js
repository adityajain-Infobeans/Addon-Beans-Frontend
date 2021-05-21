const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const User = db.define(
    'User',
    {
        emp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        emp_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emp_role: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        emp_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emp_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'infobeans_user_details',
        timestamps: false,
    }
);

module.exports = User;
