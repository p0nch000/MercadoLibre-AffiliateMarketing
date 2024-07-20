//Model Associations

import { Product } from './products.js';
import { Link } from './links.js';

/**
 * Define the relationships between Product and Link models
 * This sets up a one-to-one relationship between Product and Link
 */

// A Product has one Link
Product.hasOne(Link, {
    foreignKey: 'id_product',
    as: 'Link'
});
// A Link belongs to one Product
Link.belongsTo(Product, {
    foreignKey: 'id_product',
    as: 'Product'
});

/**
 * These associations mean:
 * 1. Each Product can have one associated Link
 * 2. Each Link must belong to one Product
 * 3. The 'id_product' column in the Links table is used as the foreign key
 * 4. We can use 'Product.Link' and 'Link.Product' to access the associated model in queries
 */



