import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/database';
import empleadoRoutes from './route/empleado.route';
import sedeRoutes from './route/sede.route';
import cargoRoutes from './route/cargo.route';
import horarioRoutes from './route/horario.route';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rutas de la API
app.use('/api/empleados', empleadoRoutes);
app.use('/api/sedes', sedeRoutes);
app.use('/api/cargos', cargoRoutes);
app.use('/api/horarios', horarioRoutes);

app.get('/api/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'ok', db_time: result.rows[0].now });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error de base de datos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});