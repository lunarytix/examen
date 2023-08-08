import { Router } from "express";
import { check } from "express-validator";
import Menus from "../controllers/menus";
import Roles from "../controllers/roles";
import { validateInputs } from "../middlewares/validate_fields";
import { validateToken } from "../middlewares/validate_token";


const router = Router();
const roles = new Roles();

router.get("/",[
    validateToken
], roles.getAll );

router.get("/:id",[
    validateToken
], roles.getPK );

export default router;

