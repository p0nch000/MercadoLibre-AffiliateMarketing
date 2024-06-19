import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Fetch 50 deals from Mercado Libre API
export const fetchDeals = async () => {
    try {
        const response = await axios.get('https://api.mercadolibre.com/sites/MLM/search', {
            params: {
                category: 'MLM1648', 
                limit: 50
            },
            headers: {
                Authorization: `Bearer ${process.env.MERCADO_LIBRE_ACCESS_TOKEN}`
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error fetching deals:', error);
    }
}


