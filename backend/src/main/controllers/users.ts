import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcryptjs from "bcryptjs";
import SimpleResponse from "../objects/simple-response";
import Empresa from '../models/empresa';
import Rol from "../models/rol";
import Menu from '../models/menu';
import { Op } from "sequelize";
import RolOpcion from '../models/rol-opcion';

// Obtener usuarios
const getUsers = async ( req: Request, res: Response ) => {

    try {
        const users = await Usuario.findAll({
            where:{
                estado: 1
            },
            include: {
                foreignKey: 'empesaId',
                model: Empresa,
                attributes: ['id','razonSocial','nombreComercial'],
                as: "empresa"
            }
        });
        res.status(200).json( new SimpleResponse(false, 'getUsers' ,users) );
    } catch (error) {
        res.status(400).json( new SimpleResponse(true, 'error' ,error) );
    }

}
// Registrar usuarios
const saveUsers = async (req: Request, res: Response) => {

    // tslint:disable-next-line: prefer-const
    try {
        let { nombre , apellidoP, apellidoM , correo, password, telefono, empresaId } = req.body;
        
        const usuario =  await Usuario.findOne({
            where:{ correo, estado: true }
        });
        //Verficar si el correo esta registrado con otro usuario
        if (usuario) {
            return res.status(400).json(new SimpleResponse(true,'Este correo ya se encuentra registrado.',{}));
        }    

        // const rolGenerico:any = await Rol.findOne({
        //     where:{ nombre: 'GENERICO'}
        // });

        // if (!rolGenerico) {
        //     return res.status(400).json(new SimpleResponse(true,'No existe un rol, favor de contactar al administrador.',{}));
        // }  


        // Cifrar Password
        const salt = bcryptjs.genSaltSync();
        password = bcryptjs.hashSync(password, salt);
        /* */
        const user:any = await Usuario.create({
            nombre: nombre?.toUpperCase(),
            apellidoP: apellidoP?.toUpperCase(),
            apellidoM: apellidoM?.toUpperCase(),
            correo: correo?.toUpperCase(),
            password,
            telefono,
            empresaId,
            verificado: true
        });

         // Crear Rol para usuario
         const nuevoRol:any = await Rol.create({
            nombre: `ROL_${user?.id}_${user?.correo}`,
            descripcion: `ROL_${user?.uid}_${user?.correo}`
        });
        //Buscar menu default sistemas
        const menuDefault:any = await Menu.findOne({
            where: {
                nombre: {
                    [Op.or]: [ 'sistemas','Sistemas','SISTEMAS']
                }
            }
        });

        //Si menu no existe
        // if (!menuDefault) {
        //     menuDefault.id = user.rolId;
        // }

        await RolOpcion.create({
            rolId: nuevoRol?.id,
            menuId: menuDefault?.id,
            opcionId: 1
        });
        //

        // Actualizar usuario
        user.rolId = nuevoRol?.id;
        await user.save();

        res.status(200).json( new SimpleResponse(false, 'saveUsers' ,user) );
    } catch (error) {
        res.status(400).json( new SimpleResponse(true, 'error' ,error) );
    }
}

// Obtener usuario por id
const getUserById = async (req: Request, res: Response) => {
    const id =  req.params.id;
    try {
        const user = await Usuario.findByPk(id);

        if (!user)
            return res.status(400).json( new SimpleResponse(true, 'Usuario no se encuentra registrado' ,{}) );


        res.status(200).json( new SimpleResponse(false, 'getUserById' ,user) );
    } catch (error) {
        res.status(400).json( new SimpleResponse(true, 'error' ,error) );
    }
}

// Actualizar usuario
const updateUser =async (req: Request, res: Response) => {
    const { nombre , apellidoP, apellidoM , correo, telefono, empresaId } = req.body;
    const id = req.params.id;
    try {
        const user = await Usuario.findByPk(id).then((obj)=> obj?.update({
            nombre,
            apellidoP,
            apellidoM,
            correo,
            telefono,
            empresaId
        })) || {};

        res.status(200).json( new SimpleResponse(false, 'updateUser' ,user) );
    } catch (error) {
        res.status(400).json( new SimpleResponse(true, 'error' ,error) );
    }
}

// Cambiar usuario a estado 0
const deleteUser = async (req: Request, res: Response) => {
    const id =  req.params.id;
    try {
        const user = await Usuario.findByPk(id).then((obj)=> obj?.update({
            estado: 0
        })) || {};

        if (!user)
            return res.status(400).json( new SimpleResponse(true, 'Usuario no se encuentra registrado' ,{}) );

        res.status(200).json( new SimpleResponse(false, 'deleteUser' ,user) );
    } catch (error) {
        res.status(400).json( new SimpleResponse(true, 'error' ,error) );
    }
}

// Cambiar usuario a estado 0
const updataPassword = async (req: Request, res: Response) => {
    const id =  req.params.id;
    let { password } = req.body;
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);
    try {
        const user = await Usuario.findByPk(id).then((obj)=> obj?.update({
            password
        })) || {};

        if (!user)
            return res.status(400).json( new SimpleResponse(true, 'Usuario no se encuentra registrado' ,{}) );

        res.status(200).json( new SimpleResponse(false, 'updatePassword' ,user) );
    } catch (error) {
        res.status(400).json( new SimpleResponse(true, 'error' ,error) );
    }
}

export {
    getUsers,
    saveUsers,
    getUserById,
    updateUser,
    deleteUser,
    updataPassword
}

