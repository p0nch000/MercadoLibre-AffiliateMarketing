import { Link } from '../models/links.js';

/**
 * Periodically checks for the completion of affiliate links and executes a callback when all links are ready.
 * This function runs every 5 minutes until all affiliate links are populated.
 * 
 * @param {Function} callback - Function to be called when all affiliate links are ready
 */
export const checkAffiliateLinks = async (callback) => {
    const checkInterval = 5 * 60 * 1000; 

    const verifyLinks = async () => {
        const incompleteCount = await Link.count({
            where: {
                affiliate_link: null
            }
        });

        console.log(`Verificando enlaces de afiliados... Pendientes: ${incompleteCount}`);

        if (incompleteCount === 0) {
            console.log("Todos los enlaces de afiliados están listos. Procediendo a enviar productos...");
            callback();
        } else {
            console.log(`Aún faltan ${incompleteCount} enlaces de afiliados. Reintentando en 5 minutos...`);
            setTimeout(verifyLinks, checkInterval); 
        }
    };

    verifyLinks(); 
};
