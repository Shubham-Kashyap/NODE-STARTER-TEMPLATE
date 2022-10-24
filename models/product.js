const { sequelize, DataTypes } = require('../config/db');

module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.DECIMAL
        }, sale_price: {
            type: DataTypes.DECIMAL,
        }, sku: {
            type: DataTypes.INTEGER
        }, qty: {
            type: DataTypes.INTEGER
        }
    }).sync({
        alter: true
    })
    return Product;
}