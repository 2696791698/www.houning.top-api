const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const connectDB = async () => {
    try {
        await pool.query('SELECT NOW()'); 
        console.log('数据库连接正常');
    } catch (err) {
        console.error('数据库连接异常: ', err.message);
    }
}

connectDB()

module.exports = pool