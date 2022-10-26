const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {

    const Product = sequelize.define('Product', {
        _id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
    }, {
        tableName: "users",
    })
    return Product;
}