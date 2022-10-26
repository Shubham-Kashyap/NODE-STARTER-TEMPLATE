const chalk = require('chalk');
const { model } = require('mongoose');
const { Sequelize, DataTypes } = require('sequelize'); //  required
const env = require('dotenv').config();


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

const connectWithDatabase = async () => {
    await sequelize.authenticate();
    await sequelize.sync({
        alter: true,
        // force: true,
    })
    console.log(chalk.yellow.bold('Connection with DB has been established successfully.'));
};


const models = {
    User: require('../models/user')(sequelize),
    Cart: require('../models/cart')(sequelize),
    Product: require('../models/product')(sequelize),
}

exports.sequelize = sequelize;
exports.Sequelize = Sequelize;
exports.DataTypes = DataTypes;
exports.models = models;
exports.connectWithDatabase = connectWithDatabase;

exports.User = models.User;
exports.Cart = models.Cart;
exports.Product = models.Product;
