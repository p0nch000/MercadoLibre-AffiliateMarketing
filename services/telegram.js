import { CronJob } from 'cron';
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


// Function to send products every minute
export const sendProducts = (bot, userChatIds) => {
    const job = new CronJob('0 */1 * * * *', async () => {
        const link = await Link.findOne({
            include: [{ 
                model: Product, 
                as: 'Product',
                attributes: ['title', 'price', 'original_price', 'discount_percentage', 'marketplace'] 
            }]
        });
        
        if (link && link.Product) {
            const message = messageFormat(
                link.Product.marketplace,
                link.Product.title,
                link.affiliate_link || link.permalink,
                link.Product.discount_percentage,
                link.Product.price,
                link.Product.original_price
            );
            userChatIds.forEach(chatId => {
                bot.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' });
            });
            await link.destroy();
        } else {
            console.log("No product found or no link found.");
        }
    });
    job.start();
};


