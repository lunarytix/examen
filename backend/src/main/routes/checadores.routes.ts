import { Router } from "express";
 import { validateToken } from "../middlewares/validate_token";
import Checadores from '../controllers/checadores';

const router = Router();
const checadores = new Checadores();

router.get('/',[
    validateToken
],checadores.getAll)

export default router;
