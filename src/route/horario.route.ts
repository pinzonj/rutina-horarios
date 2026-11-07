import { Router } from 'express';
import { getMatrizOperativa, saveTurnoOperativo } from '../controller/horario.controller';

const router = Router();

router.get('/matriz', getMatrizOperativa);
router.post('/turno', saveTurnoOperativo);

export default router;