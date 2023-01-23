const sequelize = require('sequelize');
require('dotenv').config({ path: './config/.env' });

const database = process.env.DB_DATABASE;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const password = process.env.DB_PASSWORD;

const connection = new sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;