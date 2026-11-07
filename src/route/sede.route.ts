import { Router } from 'express';
import { getSedes, createSede } from '../controller/sede.controller';

const router = Router();

router.get('/', getSedes);
router.post('/', createSede);

export default router;