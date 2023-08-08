import { Router } from "express";
import { check } from "express-validator";
import Companys from "../controllers/companys";
import { validateInputs } from "../middlewares/validate_fields";
import { validateToken } from "../middlewares/validate_token";


const router = Router();
const companys = new Companys();

router.get("/public",[
    // validateToken
], companys.getAll );


router.get("/",[
    validateToken
], companys.obtenerEmpresasPorUsuario );

router.get("/:id",[
    validateToken
], companys.getPK );

router.post("/",[
    validateToken,
    check('razonSocial', "Razon social es obligatorio").not().isEmpty(),
    check('nombreComercial', "Nombre comercial es obligatorio").not().isEmpty(),
    // check('direccion', "Dirección es obligatorio").not().isEmpty(),
    // check('correo', "Correo no valido").isEmail(),
    // check('telefono', "El telefono es obligatorio").not().isEmpty(),
    // check('telefono', "El telefono debe tener entre 10 y 12 caracteres").isLength({ min: 10, max: 12 }),
    validateInputs
], companys.create );

router.put("/:id",[
    validateToken,
    check('razonSocial', "Razon social es obligatorio").not().isEmpty(),
    check('nombreComercial', "Nombre comercial es obligatorio").not().isEmpty(),
    // check('direccion', "Dirección es obligatorio").not().isEmpty(),
    // check('correo', "Correo no valido").isEmail(),
    // check('telefono', "El telefono es obligatorio").not().isEmpty(),
    // check('telefono', "El telefono debe tener entre 10 y 12 caracteres").isLength({ min: 10, max: 12 }),
    validateInputs
], companys.update );


router.delete("/:id",[
    validateToken
], companys.disabledRow );


router.get("/obtenerEmpresasPorUsuarioId/:id",[
    validateToken
],companys.obtenerEmpresasPorUsuarioId);


router.post("/asignarEmpresasUsuario",[
    validateToken,
    check('empresas[0][id]', "Empresas es obligatorio").not().isEmpty(),
    check('usuario', "Usuario es obligatorio").not().isEmpty(),
   validateInputs
], companys.asignarEmpresasUsuario );

export default router;

