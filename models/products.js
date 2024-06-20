import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Product = sequelize.define(
    'Product',
    {
        id_product: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        original_price: {
            type: DataTypes.DOUBLE
        },
    },{
        tableName: 'products'
    }
);