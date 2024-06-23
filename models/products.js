import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Product = sequelize.define(
    'Product',
    {
        id_product: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.STRING,
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
        id_category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        original_price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        discount_percentage: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        marketplace: {
            type: DataTypes.ENUM,
            values: ['TEMU', 'MERCADO LIBRE', 'SHEIN'],
            allowNull: false
        }
    },{
        tableName: 'products'
    }
);