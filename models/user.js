const { chalk } = require('../exports/module');
const { sequelize, DataTypes } = require('../config/db');


module.exports = (connection) => {
    const user = connection?.define('User', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        dob: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user",
        },
        personal_access_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_no: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        remember_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_email_verified: {
            type: DataTypes.ENUM,
            values: ["1", "0"],
            defaultValue: "0",
        },
        auth_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

    }, {
        tableName: "users",
        timestamps: true
    }).sync({
        alter: true,
        // force: true,
    }).then(() => {
        console.log(chalk.yellow.bold('User table is synchronized successfully !'));
    });
    console.log(chalk.yellow.bold("Syncing user model :", connection.models.User));
    return user;

}
