import { sequelize } from './config/db.js';
import dotenv from 'dotenv';
import './models/associations.js';
import { storeDeals } from './services/deals.js';

dotenv.config();

async function main() {

    await sequelize.sync({force: false});
    console.log("Succesfully connected to DescuentazosMX database...")
    
    await storeDeals();
}

main();
