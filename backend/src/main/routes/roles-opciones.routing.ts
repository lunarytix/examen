import { Router } from "express";
import { check } from "express-validator";
import Menus from "../controllers/menus";
import RolesOpciones from "../controllers/roles-opciones";
import { validateInputs } from "../middlewares/validate_fields";
import { validateToken } from "../middlewares/validate_token";


const router = Router();
// const menus = new Menus();
const opciones = new RolesOpciones();

router.get("/",[
    validateToken
], opciones.getAll );


router.post("/obtenerMenu",[
    validateToken
], opciones.obtenerMenusUsuarioRuta );


/*Esta ruta se usa para asignar permisos en modulo de configuración */
router.get("/obtenerTodasOpcionesPorUsuario/:id",[
    validateToken
], opciones.obtenerTodasOpcionesPorUsuario );

 // router.get("/:id",[
//     validateToken,
//     check('ruta', "Ruta es obligatorio").not().isEmpty(),
//     validateInputs
// ], opciones.obtenerMenusUsuarioModulo );

router.post("/asignarPermisos",[
    validateToken,
    check('id', "Usuario es obligatorio").not().isEmpty(),
    check('id', "Usuario invalido.").isNumeric(),
    // check('opciones', "Las opciones son obligatorias").not().isEmpty(),
    check('opciones', "Las opciones son invaliadas").isArray(),
    // check('padres', "Las opciones p son obligatorias").not().isEmpty(),
    check('padres', "Las opciones p son invaliadas").isArray(),
    validateInputs
], opciones.asignarPermisos );






export default router;

