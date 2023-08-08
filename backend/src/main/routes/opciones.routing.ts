import { Router } from "express";
import { check } from "express-validator";
import Opciones from "../controllers/opciones";
import { validateInputs } from "../middlewares/validate_fields";
import { validateToken } from "../middlewares/validate_token";


const router = Router();
const opciones = new Opciones();

router.get("/",[
    validateToken
], opciones.getAll );

router.get("/:id",[
    validateToken
], opciones.getPK );

export default router;

