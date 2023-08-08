import { Router } from "express";
import { check } from "express-validator";
import Auth from "../controllers/auths";
import { validateInputs } from "../middlewares/validate_fields";
import { validateToken } from "../middlewares/validate_token";


const router = Router();
const auth = new Auth();

router.post("/login",[
    check('correo',"Correo no valido.").isEmail(),
    check('password',"Contrasena debe tener más de 6 caracateres.").isLength({ min: 6}),
    validateInputs
],auth.login);


router.post("/loginGoogle",[
    check('usuario[email]',"Correo no valido.").isEmail(),
    check('token',"Token no valido.").not().isEmpty(),
    validateInputs
],auth.loginGoogle);


router.put("/change_password",[
    validateToken,
    check('password',"Contrasena debe tener más de 6 caracateres.").isLength({ min: 6}),
    validateInputs
],auth.changePassword);


router.get('/renewToken', validateToken, [auth.renewToken]);


router.post("/signup",[
    check('nombre', "Nombre es obligatorio").not().isEmpty(),
    check('apellidoP', "Apellido paterno es obligatorio").not().isEmpty(),
    // check('password', "Contrasena debe tener más de 6 caracateres").isLength({ min: 6 }),
    check('correo', "Correo no valido").isEmail(),
    check('empresaId', "Empresa es requerida").not().isEmpty(),
    check('empresaId', "Empresa invalida").isNumeric(),
   validateInputs
],auth.registrarUsuario);

router.get('/verificarCuenta/:token', [], auth.verificarCuenta);



// router.post("/logout",[
//     check('correo',"Correo no valido.").isEmail(),
//     check('password',"Contrasena debe tener más de 6 caracateres.").isLength({ min: 6}),
//     validarCampos
// ],logout);

// routers.get('/verificar_token', [], verificarToken);



export default router;

