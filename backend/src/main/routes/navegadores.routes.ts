import { Router } from "express";
import { validateToken } from "../middlewares/validate_token";
import Navegadores from '../controllers/navegadores';

const router = Router();
const navegadores = new Navegadores();

router.get('/',[
    validateToken
],navegadores.getAll)

export default router;
