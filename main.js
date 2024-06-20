import { sequelize } from './config/db.js';
import dotenv from 'dotenv';
import './models/associations.js';
import { fetchDealsForCategories } from './services/mercadoLibre.js';

dotenv.config();

async function main() {

    await sequelize.sync({force: true});
    console.log("Succesfully connected to DescuentazosMX database...")
    
    const deals = await fetchDealsForCategories();
    console.log(deals);
}

main();
