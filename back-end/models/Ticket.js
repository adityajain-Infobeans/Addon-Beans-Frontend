const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const Ticket = db.define(
    'Ticket',
    {
        ticket_name: {
            type: DataTypes.STRING,
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
    }
);

module.exports = Ticket;
