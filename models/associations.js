//Model Associations

import { Product } from './products.js';
import { Link } from './links.js';

// Define a one-to-one relationship
Product.hasOne(Link, {
    foreignKey: 'id_product', 
});

Link.belongsTo(Product, {
    foreignKey: 'id_product',

});


