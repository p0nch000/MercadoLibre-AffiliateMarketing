/**
 * Formats a product message for Telegram using Markdown.
 * 
 * @param {string} marketplace - The name of the marketplace (e.g., "Mercado Libre")
 * @param {string} title - The title of the product
 * @param {string} affiliate_link - The affiliate link for the product
 * @param {number} discount_percentage - The discount percentage
 * @param {number} price - The current price of the product
 * @param {number} original_price - The original price of the product
 * @param {string} image_url - The URL of the product image (not used in the message, but included for potential future use)
 * @returns {string} Formatted message string in Markdown
 */
export const messageFormat = (marketplace, title, affiliate_link, discount_percentage, price, original_price, image_url) => {
    return `*PROMOCIÓN*\n` +
           `*${marketplace}*: _${title}_\n\n` +
           `*Enlace*: ${affiliate_link}\n\n` +
           `*${discount_percentage}% de descuento*\n` +
           `🔥 *Precio Oferta*: $${price}\n` +
           `*Precio anterior*: $${original_price}\n\n` + 
           `Únete a nuestras otras redes: [MercadoLibre](https://www.mercadolibre.com.mx/social/pedi4076754), [Instagram](#), [TikTok](#)`;
};


