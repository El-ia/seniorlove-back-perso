import "dotenv/config";
import { Sequelize } from "sequelize";

const isProduction = process.env.NODE_ENV === 'production';

//init sequelize connexion with our BDD
export const sequelize = new Sequelize(
  process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: isProduction
      ? { ssl: { require: true, rejectUnauthorized: false } } // En prod, Render exige SSL
      : {}, // En local, pas besoin de SSL
    define: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  }
);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}