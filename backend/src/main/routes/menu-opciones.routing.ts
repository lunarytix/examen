import { Router } from "express";
import MenusOpciones from "../controllers/menus-opciones";
import { validateToken } from "../middlewares/validate_token";


const router = Router();
// const menus = new Menus();
const opciones = new MenusOpciones();

router.get("/",[
    validateToken
], opciones.getAll );

router.get("/:id",[
    validateToken
], opciones.getPK );

export default router;

