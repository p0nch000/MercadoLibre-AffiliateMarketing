import './models/associations.js';
import { sequelize } from './config/db.js';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { storeDeals } from './services/deals.js';
import { setupBot, sendProducts } from './services/telegram.js'; 
dotenv.config();

async function main() {
    const bot = new Telegraf(process.env.BOT_KEY);
    let userChatIds = []; 

    // Bot setup (commands)
    setupBot(bot, userChatIds);

    // Start the bot
    bot.launch();
    
    await sequelize.sync({force: false});
    console.log("Successfully connected to DescuentazosMX database...");

    //Store deals
    //storeDeals();

    // Initialize cron job to send products
    sendProducts(bot, userChatIds);

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

