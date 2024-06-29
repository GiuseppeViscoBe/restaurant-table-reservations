"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
// import mysql from 'mysql2';
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const pool = mysql.createPool({
//     host : process.env.MYSQL_HOST,
//     user : process.env.MYSQL_USER,
//     password : process.env.MYSQL_PASSWORD,
//     database : process.env.MYSQL_DATABASE
// }).promise();
const connectDatabase = async () => {
    try {
        mysql2_1.default.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        }).promise();
        console.log('Database connection established');
    }
    catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to the database');
    }
};
exports.connectDatabase = connectDatabase;
// async function fetchData() {
//     try {
//         const result = await pool.query('SELECT * FROM users');
//         console.log(result); // Handle your result data here
//     } catch (error) {
//         console.error('Error executing query:', error);
//     }
// }
// fetchData();
