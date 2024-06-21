import axios from "axios";
import dotenv from "dotenv";
import { categories } from "../utils/categoriesMLM.js";  

dotenv.config();

// Fetch products with category_id, map only the needed values per item
export const fetchCategoryProducts = async (category_id) => {
    try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLM/search`, {
            params: {
                category: category_id,
                sort: 'sold_quantity_desc',
                limit: 10
            },
            headers: {
                Authorization: `Bearer ${process.env.MERCADO_LIBRE_ACCESS_TOKEN}`
            }
        });
        
        const products = response.data.results.map(product => {
            const originalPrice = product.original_price || product.price;
            const currentPrice = product.price;
            const discountPercentage = Math.floor(((originalPrice - currentPrice) / originalPrice) * 100);

            return {
                id_product: product.id,
                title: product.title,
                condition: product.condition,
                id_category: product.category_id,
                price: currentPrice,
                original_price: originalPrice,
                discount_percentage: discountPercentage,
                permalink: product.permalink
            };
        }).filter(product => product.discount_percentage >= 5); 

        return products;
    } catch (error) {
        console.error('Error fetching category products:', error);
        return null;  
    }
};


// Get the fetched category products and classify them according to their categories
export const fetchDealsForCategories = async () => {
    const allCategoryDeals = {};

    for (const category of categories) {
        const products = await fetchCategoryProducts(category.id);
        if (products) {
            allCategoryDeals[category.name] = products;
        } else {
            allCategoryDeals[category.name] = []; 
        }
    }
    return allCategoryDeals;
};
 
