import { sequelize } from './config/db.js';
import router from "./routes/routes.js";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchDealsForCategories } from './services/mercadoLibre.js';

dotenv.config();

//Initialze app
const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
    cors({
            origin: "*",
            methods: "GET, POST, PUT, DELETE, PATCH",
            allowedHeaders: "Content-Type, Origin, Authorization",
        })
);

//Gateway
app.use(router);

async function main() {

    await sequelize.sync({force: false});
    console.log("Succesfully connected to DescuentazosMX database...")

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
    
    const deals = await fetchDealsForCategories();
    console.log(deals);
}

main();

export default app;