import { Link } from '../models/links.js';

//Every 5 minutes checks for affiliate links complete
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
