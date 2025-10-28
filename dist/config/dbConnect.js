import 'dotenv/config';
import { Sequelize } from 'sequelize';
import messages from '../helper/constants/messages.js';
const DB_NAME = process.env.DB_DBNAME ?? 'task_TS';
const DB_USERNAME = process.env.DB_USERNAME ?? 'root';
const DB_PASSWORD = process.env.DB_PASSWORD ?? ''; // fixed typo
const DB_DIALECT = (process.env.DB_DIALECT ?? 'mysql');
const DB_HOST = process.env.DB_HOST ?? 'localhost';
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});
export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log(messages.SUCCESS.DB_CONN_SUCCESS);
    }
    catch (error) {
        console.error(messages.ERROR.DB_CONN_ERR, error);
    }
}
export { sequelize };
