import { sequelize } from './config/db.js';


async function main() {

    await sequelize.sync({force: false});
    console.log("Succesfully connected to DescuentazosMX database...")
}

main();
