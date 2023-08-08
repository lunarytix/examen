import { Router } from "express";
import { check } from "express-validator";
import Modules from "../controllers/modules";
import { validateInputs } from "../middlewares/validate_fields";
import { validateToken } from "../middlewares/validate_token";

const modulos = new Modules();
const router = Router();

router.get("/",[
    validateToken
],modulos.obtenerModulos);



router.post("/",[
    validateToken,
    check('nombre', "Nombre es obligatorio").not().isEmpty(),
    check('descripcion', "Descripción es obligatorio").not().isEmpty(),
    check('url', "Url es obligatorio").not().isEmpty(),
    validateInputs
],modulos.create);

router.put("/:id",[
    validateToken,
    check('nombre', "Nombre es obligatorio").not().isEmpty(),
    check('descripcion', "Descripción es obligatorio").not().isEmpty(),
    check('url', "Url es obligatorio").not().isEmpty(),
    validateInputs
],modulos.update);

router.delete("/:id",[
    validateToken
],modulos.disabledRow);

router.get("/usuario",[
    validateToken
],modulos.obtenerModulosPorUsuario);

router.get("/:id",[
    validateToken
],modulos.getPK);

export default router;

