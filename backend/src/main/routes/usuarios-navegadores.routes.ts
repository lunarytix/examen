import { Router } from "express";
import { validateToken } from "../middlewares/validate_token";
import UsuariosNavegadores from '../controllers/usuarios-navegadores';

const router = Router();
const usuariosNavegadores = new UsuariosNavegadores();

router.get('/',[
    validateToken
],usuariosNavegadores.getAll)

export default router;
