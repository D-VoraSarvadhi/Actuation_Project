import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const { DB_NAME, DB_USER, DB_PASSWORD }: any = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  port: 5433,
  logging: false
});

db.sync({ alter: true });

export default db;