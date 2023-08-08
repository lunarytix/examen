import { Router } from "express";
import { check } from "express-validator";
import Menus from "../controllers/menus";
import { validateInputs } from "../middlewares/validate_fields";
import { validateToken } from "../middlewares/validate_token";


const router = Router();
const menus = new Menus();

router.get("/",[
    validateToken
], menus.getAll );

router.get("/:id",[
    validateToken
], menus.getPK );

export default router;

