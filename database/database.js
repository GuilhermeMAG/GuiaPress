const sequelize = require('sequelize');
const process = require('dotenv/config');

const db = process.env.DB;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const password = process.env.DB_PASSWORD;

const connection = new sequelize(db, user, password, {
    host: host,
    port: port,
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;