import axios from "axios";
import dotenv from "dotenv";
import { categories } from "../utils/categoriesMLM.js";  

dotenv.config();

/**
 * Refreshes the Mercado Libre access token using the refresh token.
 * This function is called when the current access token has expired.
 * @returns {Promise<string>} The new access token
 */
async function refreshMLToken() {
    try {
        const response = await axios.post('https://api.mercadolibre.com/oauth/token', {
            grant_type: 'refresh_token',
            client_id: process.env.MERCADO_LIBRE_APP_ID,
            client_secret: process.env.MERCADO_LIBRE_CLIENT_SECRET,
            refresh_token: process.env.MERCADO_LIBRE_REFRESH_TOKEN
        });

        const { access_token, expires_in, refresh_token } = response.data;
        process.env.MERCADO_LIBRE_ACCESS_TOKEN = access_token;
        process.env.MERCADO_LIBRE_REFRESH_TOKEN = refresh_token;
        const newExpirationTime = new Date().getTime() + expires_in * 1000;
        process.env.MERCADO_LIBRE_TOKEN_EXPIRATION = newExpirationTime;

        console.log('Token refreshed successfully.');
        return access_token;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw new Error('Failed to refresh token');
    }
}

/**
 * Retrieves a valid Mercado Libre access token.
 * If the current token has expired, it calls refreshMLToken to get a new one.
 * @returns {Promise<string>} A valid access token
 */
async function getValidAccessToken() {
    const expirationTime = parseInt(process.env.MERCADO_LIBRE_TOKEN_EXPIRATION, 10);
    if (new Date().getTime() > expirationTime) {
        return await refreshMLToken();
    }
    return process.env.MERCADO_LIBRE_ACCESS_TOKEN;
}

/**
 * Fetches detailed product information, including high-resolution images.
 * @param {string} product_id - The ID of the product to fetch details for
 * @param {string} accessToken - A valid Mercado Libre access token
 * @returns {Promise<string|null>} URL of the first high-resolution image, or null if not found
 */
async function fetchProductDetails(product_id, accessToken) {
    try {
        const response = await axios.get(`https://api.mercadolibre.com/items/${product_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const pictures = response.data.pictures.map(pic => pic.url);
        return pictures.length > 0 ? pictures[0] : null;  
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
}

/**
 * Fetches products for a specific category from Mercado Libre.
 * It retrieves the top 10 products sorted by sold quantity and includes discount information.
 * @param {string} category_id - The ID of the category to fetch products for
 * @returns {Promise<Array|null>} An array of product objects or null if an error occurs
 */
export const fetchCategoryProducts = async (category_id) => {
    const accessToken = await getValidAccessToken();
    try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLM/search`, {
            params: {
                category: category_id,
                sort: 'sold_quantity_desc',
                limit: 10
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const products = await Promise.all(response.data.results.map(async product => {
            const highResImage = await fetchProductDetails(product.id, accessToken);
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
                permalink: product.permalink,
                image_url: highResImage || product.thumbnail,  
                marketplace: 'MERCADO LIBRE',
            };
        }));

        return products.filter(product => product.discount_percentage >= 5);
    } catch (error) {
        console.error('Error fetching category products:', error);
        return null;
    }
};

/**
 * Fetches deals for all categories defined in the categories array.
 * It organizes the fetched products by category name.
 * @returns {Promise<Object>} An object where keys are category names and values are arrays of product deals
 */
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
 
