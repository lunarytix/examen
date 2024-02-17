import { Router } from "express";
import { validateToken } from "../../middlewares/validate_token";
import { check } from "express-validator";
import { validateInputs } from "../../middlewares/validate_fields";

import Prospectos from "../controller/prospectos";



const router = Router();
const controller = new Prospectos();

// new Facturas();
// new FacturasDetalles();

// new Facturas();
// new FacturasDetalles();

router.get('/',[
    // validateToken
], controller.getAll)



router.post('/buscar',[
    // validateToken,
    check('inicial',"Fecha inicial requerida").not().isEmpty(),
    check('final',"Fecha final requerida").not().isEmpty(),
    validateInputs
], controller.buscarPorFechas)



router.get('/:id',[
    // validateToken
], controller.getPK)

router.post('/', [
    // check("nombre", "Nombre es requerido").not().isEmpty(),
    // check("porcentaje","porcentaje es requerido").isNumeric(),
    // check("tipo", "Tipo es requerido").not().isEmpty(),
    // check("idgrupo", "Grupo es requerido").not().isEmpty(),
    // check("rfc", "RFC es requerido").not().isEmpty(),
    validateInputs,
    // validateToken
],controller.create)



router.put('/:id', [
    // check("nombre", "Nombre es requerido").not().isEmpty(),
    // check("porcentaje","porcentaje es requerido").isNumeric(),
    // check("tipo", "Tipo es requerido").not().isEmpty(),
    // check("idgrupo", "Grupo es requerido").not().isEmpty(),
    // check("rfc", "RFC es requerido").not().isEmpty(),
    validateInputs,
    // validateToken
],controller.update)


router.put('/autorizacion/:id', [
    // check("nombre", "Nombre es requerido").not().isEmpty(),
    // check("porcentaje","porcentaje es requerido").isNumeric(),
    // check("tipo", "Tipo es requerido").not().isEmpty(),
    // check("idgrupo", "Grupo es requerido").not().isEmpty(),
    // check("rfc", "RFC es requerido").not().isEmpty(),
    validateInputs,
    // validateToken
],controller.autorizacionProspecto)


router.delete('/:id',[
    // validateToken
], controller.disabledRow)

export default router;