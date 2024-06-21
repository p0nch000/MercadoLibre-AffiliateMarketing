import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Product } from './products.js';

export const Link = sequelize.define(
    'Link',
    {
        id_link:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        id_product: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Product,
                key: 'id_product'
            }
        },
        permalink: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true  
            }
        },
        affiliate_link: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true,  
                notEmpty: true  
            }
        }   
    },{
        tableName: 'links'
    }
    );