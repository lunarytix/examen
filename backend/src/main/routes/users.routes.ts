import { Router } from "express";
import { check } from "express-validator";
import { deleteUser, getUserById, getUsers , saveUsers, updataPassword, updateUser} from "../controllers/users";
import { validateToken } from "../middlewares/validate_token";
import { validateInputs } from "../middlewares/validate_fields";

const router = Router();

// EndPoint para obtener listado de usuarios activos
router.get("/",[
    validateToken
],getUsers);

// EndPoint para obtener registrar usuario
router.post("/",[
    validateToken,
    check('nombre', "Nombre es obligatorio").not().isEmpty(),
    check('apellidoP', "Apellido paterno es obligatorio").not().isEmpty(),
    check('password', "Contrasena debe tener más de 6 caracateres").isLength({ min: 6 }),
    check('correo', "Correo no valido").isEmail(),
    // check('telefono', "El telefono es obligatorio").not().isEmpty(),
    // check('telefono', "El telefono debe tener entre 10 y 12 caracteres").isLength({ min: 10, max: 12 }),
    check('empresaId', "Empresa es requerida").not().isEmpty(),
    check('empresaId', "Empresa invalida").isNumeric(),
   validateInputs
],saveUsers);

// EndPoint para obtener un usuario por ID
router.get("/:id",[
    validateToken
],getUserById);

// EndPoint para obtener editar un usuario
router.put("/:id",[
    validateToken,
    check('nombre', "Nombre es obligatorio").not().isEmpty(),
    check('apellidoP', "Apellido paterno es obligatorio").not().isEmpty(),
    // check('password', "Contrasena debe tener más de 6 caracateres").isLength({ min: 6 }),
    check('correo', "Correo no valido").isEmail(),
    // check('telefono', "El telefono es obligatorio").not().isEmpty(),
    // check('telefono', "El telefono debe tener entre 10 y 12 caracteres").isLength({ min: 10, max: 12 }),
    check('empresaId', "Empresa es requerida").not().isEmpty(),
    check('empresaId', "Empresa invalida").isNumeric(),
   validateInputs
], updateUser);

// EndPoint para asignar estado = 0 (Inactivo) a los usuarios
router.delete("/:id",[
    validateToken
], deleteUser);

// EndPoint para cambiar a los usuarios
router.patch("/:id",[
    check('password', "Contrasena debe tener más de 6 caracateres").isLength({ min: 6 }),
    check('passwordConfirm', "Contrasenas no coinciden.").custom((value,{req}) => value === req.body.password),
    validateInputs,            
    validateToken
], updataPassword);

export default router;
