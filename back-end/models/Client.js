const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const Client = db.define(
    'Client',
    {},
    {
        tableName: 'infobeans_clients',
    }
);

module.exports = Client;
