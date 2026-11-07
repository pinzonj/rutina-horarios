import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getSedes = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM sedes ORDER BY nombre');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las sedes' });
    }
};

export const createSede = async (req: Request, res: Response) => {
    const { nombre } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO sedes (nombre) VALUES ($1) RETURNING *',
            [nombre]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la sede' });
    }
};