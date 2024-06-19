import axios from "axios"

//Fetch 100 deals from Mercado Libre API
export const fetchDeals = () => {
    const response = await axios.get('https://api.mercadolibre.com/offers');
    const deals = response.data.slice(0, 100); 
    return deals;
}

