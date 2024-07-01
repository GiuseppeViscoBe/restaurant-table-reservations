import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import dotenv from 'dotenv';
import {Database} from '../interfaces/database.interface'

dotenv.config();

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  timezone: 'Z',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = new Kysely<Database>({
  dialect: new MysqlDialect({ pool })
});

export const verifyDatabaseConnection = async (): Promise<void> => {
  let isConnected = false;
  let attempts = 0;
  const maxAttempts =  Number(process.env.MAX_ATTEMPTS)
  const retryInterval = Number(process.env.RETRY_INTERVAL); // Milliseconds
  
  while (!isConnected && attempts < maxAttempts) {
    try {
      await pool.promise().query('SELECT 1');
      console.log('Database connection established');
      isConnected = true;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed. Retrying in ${retryInterval / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryInterval));
    }
  }
  
  if (!isConnected) {
    console.error('Failed to establish database connection after multiple attempts.');
  }
};

