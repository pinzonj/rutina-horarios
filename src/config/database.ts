import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    // Usará la URL de la nube cuando esté en internet
    connectionString: process.env.postgresql://neondb_owner:npg_5mTCfzP1AZui@ep-withered-cell-bdq18nod-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require,
    // El SSL es un requisito de seguridad obligatorio en Neon y Render
    ssl: process.env.postgresql://neondb_owner:npg_5mTCfzP1AZui@ep-withered-cell-bdq18nod-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
    console.log('Conectado a la base de datos de Rutina Café');
});

pool.on('error', (err) => {
    console.error('Error en la base de datos:', err);
});