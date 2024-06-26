import './models/associations.js';
import { sequelize } from './config/db.js';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { storeDeals } from './services/deals.js';
import { CronJob } from 'cron';
import { checkAffiliateLinks } from './utils/affiliateLinks.js';
import { setupBot, sendProducts } from './services/telegram.js'; 
dotenv.config();

async function main() {
    const bot = new Telegraf(process.env.BOT_KEY);
    let userChatIds = []; 

    // Bot setup (commands)
    setupBot(bot, userChatIds);

    // Start the bot
    bot.launch();

    await sequelize.sync({ force: true });
    console.log("Successfully connected to DescuentazosMX database...");

    // Weekly cron job to fetch new deals every Monday at 10 AM
    const weeklyJob = new CronJob('0 10 * * 3', async () => {
        await storeDeals();  // Store new deals
        await checkAffiliateLinks(() => sendProducts(bot, userChatIds));  // Check for affiliate links and send products
    }, null, true, 'America/Mexico_City');
    weeklyJob.start();

    // Handling graceful shutdown
    process.on('SIGINT', () => shutdown(bot, 'SIGINT'));
    process.on('SIGTERM', () => shutdown(bot, 'SIGTERM'));
}

function shutdown(bot, signal) {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    bot.stop(signal);
    sequelize.close();
}

main();

