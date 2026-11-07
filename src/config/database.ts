import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME
});

pool.on('connect', () => {
    console.log('Conectado a la base de datos de Rutina Café');
});

pool.on('error', (err) => {
    console.error('Error en la base de datos:', err);
});