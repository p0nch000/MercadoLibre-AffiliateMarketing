import { Link } from '../models/links.js';
import { Product } from '../models/products.js';
import { fetchDealsForCategories } from './mercadoLibre.js';

// Store the results in the database
export const storeDeals = async () => {
    const deals = await fetchDealsForCategories();

    try {
        for (const category in deals) {
            const products = deals[category];
            for (const product of products) {
                const [newProduct, created] = await Product.findOrCreate({
                    where: { id_product: product.id_product },
                    defaults: {
                        title: product.title,
                        condition: product.condition,
                        id_category: product.id_category,
                        price: product.price,
                        original_price: product.original_price,
                        discount_percentage: product.discount_percentage,
                        marketplace: product.marketplace,
                        image_url: product.image_url
                    }
                });

                if (created) {
                    await Link.create({
                        id_product: newProduct.id_product,
                        permalink: product.permalink
                    });
                } else {
                    console.log(`Product with ID ${product.id_product} already exists.`);
                }
            }
        }
        console.log("Products and links stored successfully.");
    } catch (error) {
        console.error('Error storing deals:', error);
    }
};

