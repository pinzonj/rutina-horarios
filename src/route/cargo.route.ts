import { Router } from 'express';
import { getCargos, createCargo } from '../controller/cargo.controller';

const router = Router();

router.get('/', getCargos);
router.post('/', createCargo);

export default router;