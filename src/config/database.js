import "dotenv/config";
import { Sequelize } from "sequelize";

// Initialiser la connexion Sequelize avec la BDD
export const sequelize = new Sequelize(
  process.env.DATABASE_URL, {
    dialect: 'postgres',
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