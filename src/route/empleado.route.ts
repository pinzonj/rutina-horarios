import { Router } from 'express';
import { getEmpleados, createEmpleado, updateEmpleadoSede } from '../controller/empleado.controller';

const router = Router();

router.get('/', getEmpleados);
router.post('/', createEmpleado);
router.put('/:id/sede', updateEmpleadoSede); // NUEVA RUTA

export default router;