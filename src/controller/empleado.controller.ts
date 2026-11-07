import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getEmpleados = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT e.id, e.nombre, c.nombre as cargo, s.nombre as sede, e.sede_id 
            FROM empleados e
            LEFT JOIN cargos c ON e.cargo_id = c.id
            LEFT JOIN sedes s ON e.sede_id = s.id
            ORDER BY s.nombre, c.nombre, e.nombre;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los empleados' });
    }
};

export const createEmpleado = async (req: Request, res: Response) => {
    const { nombre, cargo_id, sede_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO empleados (nombre, cargo_id, sede_id) VALUES ($1, $2, $3) RETURNING *',
            [nombre, cargo_id, sede_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el empleado' });
    }
};

// NUEVA FUNCIÓN PARA ACTUALIZAR LA SEDE
export const updateEmpleadoSede = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { sede_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE empleados SET sede_id = $1 WHERE id = $2 RETURNING *',
            [sede_id === "" ? null : sede_id, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la sede' });
    }
};