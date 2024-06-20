import axios from "axios";
import dotenv from "dotenv";
import { categories } from "../utils/categoriesMLM.js";  

dotenv.config();

// Fetch products with category_id
export const fetchCategoryProducts = async (category_id) => {
    try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLM/search`, {
            params: {
                category: category_id,
                sort: 'sold_quantity_desc',
                limit: 5
            },
            headers: {
                Authorization: `Bearer ${process.env.MERCADO_LIBRE_ACCESS_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching category products:', error);
        return null;  
    }
};

// Get the fetched category products and classify them according to their categories
export const fetchDealsForCategories = async () => {
    const allCategoryDeals = {};  

    for (const category of categories) {  
        const data = await fetchCategoryProducts(category.id);  
        if (data) {
            allCategoryDeals[category.name] = data.results;  
        }
    }

    return allCategoryDeals;  
};


