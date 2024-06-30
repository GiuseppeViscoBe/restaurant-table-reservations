import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

interface Database {
  users: {
    id?: number;
    name: string;
    email: string;
  };
  reservations: {
    id?: number;
    userEmail: string;
    tableNumber: number;
    reservationTime: Date;
  };
}

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

export const verifyDatabaseConnection = async () => {
  try {
    await pool
        .promise()
        .query('SELECT 1');
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to the database');
  }
};
