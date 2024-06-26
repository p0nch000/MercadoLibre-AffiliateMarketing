import { CronJob } from 'cron';
import Sequelize from 'sequelize';
import { Product } from '../models/products.js';
import { Link } from '../models/links.js';
import { messageFormat } from '../utils/messageFormat.js';

// Initial Bot Setup
export const setupBot = (bot, userChatIds) => {
    //Command for starting the bot
    bot.start((ctx) => {
        const chatId = ctx.chat.id;
        if (!userChatIds.includes(chatId)) {
            userChatIds.push(chatId);
        }
        ctx.reply('Bienvenid@ a DescuentazosMX! Comenzare a mandarte productos en oferta de Mercado Libre...');
    });

    //Command for social media
    bot.command('socials', (ctx) => {
        let socialsMessage = 'Siguenos en nuestras redes sociales:\n';
        socialsMessage += 'Mercado Libre: [MercadoLibre](https://www.mercadolibre.com.mx/social/pedi4076754)\n';
        socialsMessage += 'TikTok: Coming soon...\n';
        socialsMessage += 'Instagram: Coming soon...';
        ctx.replyWithMarkdown(socialsMessage);
    });
};

// Function to send products every interval calculated
export const sendProducts = (bot, userChatIds) => {
    Link.count({
        include: [{
            model: Product,
            as: 'Product',
            required: true
        }]
    }).then(count => {
        const productsPerWeek = count;
        const intervalMinutes = Math.max(1, Math.floor(10080 / productsPerWeek));
        console.log("Count: ", productsPerWeek);
        console.log("Interval: ", intervalMinutes);

        const job = new CronJob(`0 */${intervalMinutes} * * * *`, async () => {
            const link = await Link.findOne({
                order: Sequelize.literal('RANDOM()'),
                include: [{ 
                    model: Product, 
                    as: 'Product',
                    attributes: ['id_product', 'title', 'price', 'original_price', 'discount_percentage', 'marketplace', 'image_url'] 
                }]
            });

            if (link && link.Product) {
                const message = messageFormat(
                    link.Product.marketplace,
                    link.Product.title,
                    link.affiliate_link || link.permalink,
                    link.Product.discount_percentage,
                    link.Product.price,
                    link.Product.original_price,
                    link.Product.image_url
                );

                userChatIds.forEach(async (chatId) => {
                    await bot.telegram.sendPhoto(chatId, { url: link.Product.image_url }, { caption: message, parse_mode: 'Markdown' });
                });

                await link.destroy(); 
            } else {
                console.log("No product found or no link found.");
            }
        });
        job.start();
    }).catch(error => {
        console.error("Error calculating product distribution:", error);
    });
};


