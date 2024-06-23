import { CronJob } from 'cron';
import { Product } from '../models/products.js';
import { Link } from '../models/links.js';

// Initial Bot Setup
export const setupBot = (bot, userChatIds) => {
    bot.start((ctx) => {
        const chatId = ctx.chat.id;
        if (!userChatIds.includes(chatId)) {
            userChatIds.push(chatId);
        }
        ctx.reply('Welcome! Starting to send you products every minute...');
    });
};

// Function to send products every minute
export const sendProducts = (bot, userChatIds) => {
    const job = new CronJob('0 */1 * * * *', async () => {
        const link = await Link.findOne({
            include: [{ 
                    model: Product, 
                    as: 'Product',
                    attributes: ['title', 'price'] 
                }]
        });
        
        if (link && link.Product) {
            const message = `Check out this product! ${link.Product.title} for just $${link.Product.price}. More details: ${link.permalink}`;
            userChatIds.forEach(chatId => {
                bot.telegram.sendMessage(chatId, message);  
            });
            await link.destroy();
        }
    });
    job.start();
};


