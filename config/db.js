import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

/**
 * Create and export a new Sequelize instance for database connection
 * 
 * This configuration uses environment variables for sensitive information:
 * DB_NAME: The name of the database
 * DB_USER: The username for database access
 * DB_PASSWORD: The password for database access
 * DB_HOST: The host address of the database
 * DB_PORT: The port number for the database connection
 */

export const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {  
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: process.env.DB_PORT,
      //dialectOptions: {
        //ssl: {
          //require: true,
          //rejectUnauthorized: false 
        //}
      });