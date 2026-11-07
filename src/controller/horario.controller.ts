import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getMatrizOperativa = async (req: Request, res: Response) => {
    const { inicio } = req.query; 
    try {
        const result = await pool.query(`
            SELECT sede, puesto, fecha, empleado_id, horario
            FROM programacion_operativa
            WHERE fecha >= $1::DATE AND fecha < $1::DATE + 7;
        `, [inicio || new Date().toISOString().split('T')[0]]);
        
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la matriz' });
    }
};

export const saveTurnoOperativo = async (req: Request, res: Response) => {
    const { sede, puesto, fecha, empleado_id, horario } = req.body;
    try {
        const result = await pool.query(`
            INSERT INTO programacion_operativa (sede, puesto, fecha, empleado_id, horario) 
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (sede, puesto, fecha) 
            DO UPDATE SET 
                empleado_id = EXCLUDED.empleado_id,
                horario = EXCLUDED.horario
            RETURNING *;
        `, [sede, puesto, fecha, empleado_id || null, horario]);
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al guardar el turno' });
    }
};