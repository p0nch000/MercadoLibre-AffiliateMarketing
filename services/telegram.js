import { CronJob } from 'cron';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { Product } from '../models/products.js';
import { Link } from '../models/links.js';
import { messageFormat } from '../utils/messageFormat.js';
import { fetchAndUpscaleImage } from '../utils/resizeImages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
                attributes: ['id_product','title', 'price', 'original_price', 'discount_percentage', 'marketplace', 'image_url'] 
            }]
        });

        if (link && link.Product) {
            let localImagePath;
            if (link.Product.image_url) {
                const fileName = `image_${link.Product.id_product}.jpg`;
                const absolutePath = path.resolve(__dirname, '../imgs', fileName);
                localImagePath = await fetchAndUpscaleImage(link.Product.image_url, absolutePath);
            }

            if (localImagePath) {
                const message = messageFormat(
                    link.Product.marketplace,
                    link.Product.title,
                    link.affiliate_link || link.permalink,
                    link.Product.discount_percentage,
                    link.Product.price,
                    link.Product.original_price
                );
                
                userChatIds.forEach(async (chatId) => {
                    await bot.telegram.sendPhoto(chatId, { source: localImagePath }, { caption: message, parse_mode: 'Markdown' });
                    await fs.unlink(localImagePath).catch(console.error);
                });
            } else {
                console.log("No image found or image processing failed.");
            }

            await link.destroy();
        } else {
            console.log("No product found or no link found.");
        }
    });
    job.start();
};


