const chalk = require('chalk');
const { Sequelize, DataTypes } = require('sequelize'); //  required

const { env } = require('../exports/module');


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

let models = {};
const connectWithDatabase = async () => {
    await sequelize.authenticate();
    models = {
        product: require('../models/product'),
    }
    console.log(chalk.yellow.bold('Connection with DB has been established successfully.'));
};
// const models = {
//     user: require('../models/product'),
//     product: require('../models/product'),
// }


exports.sequelize = sequelize;
exports.Sequelize = Sequelize;
exports.DataTypes = DataTypes;
exports.models = models;
exports.connectWithDatabase = connectWithDatabase;
