export const messageFormat = (marketplace, title, affiliate_link, discount_percentage, price, original_price) => {
    return `PROMOCIÓN\n` +
           `${marketplace}: ${title}\n\n` +
           `Enlace: ${affiliate_link}\n\n` +
           `${discount_percentage}% de descuento\n` +
           `🔥Precio Oferta: $${price}\n` +
           `Precio anterior: $${original_price}\n\n` +
           `⚡️Únete a nuestras otras redes: [MercadoLibre](https://www.mercadolibre.com.mx/social/pedi4076754), [Instagram](#), [TikTok](#)`;
};
