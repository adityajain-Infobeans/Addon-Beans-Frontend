const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const Ticket = db.define(
    'Ticket',
    {
        ticket_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        priority: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        client: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'infobeans_tickets',
        timestamps: false,
    }
);

module.exports = Ticket;
