const sequelize = require('sequelize');
const connection = new sequelize('guiapress', 'root', 'Magextreme30%', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;