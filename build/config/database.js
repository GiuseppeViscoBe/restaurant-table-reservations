"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDatabaseConnection = exports.db = void 0;
const kysely_1 = require("kysely");
const mysql2_1 = require("mysql2");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = (0, mysql2_1.createPool)({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    timezone: 'Z',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.db = new kysely_1.Kysely({
    dialect: new kysely_1.MysqlDialect({ pool })
});
const verifyDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool
            .promise()
            .query('SELECT 1');
        console.log('Database connection established');
    }
    catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Failed to connect to the database');
    }
});
exports.verifyDatabaseConnection = verifyDatabaseConnection;
