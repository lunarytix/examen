import { Request, Response } from "express";
import { Op } from "sequelize";
import { getTokenData } from "../helpers/json_wt";
import Menu from "../models/menu";
import Modulo from '../models/modulo';
import RolOpcion from "../models/rol-opcion";
import Usuario from "../models/usuario";
import SimpleResponse from "../objects/simple-response";
import RepositoryBase from "./repository-base";


class Modules extends RepositoryBase {
    constructor() {
        super(Modulo,'Modulo',{
            nombre: '',
            descripcion: '',
            url: ''
        })
    }

    obtenerModulos = async ( req: Request, res: Response ) => {
        try {
            const modulos = await Modulo.findAll({
                where: {estado: 1,visible: true}
            }) || [];

            res.status(200).json( new SimpleResponse(false,'getModules',modulos) );
        } catch (error) {
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
    }

    obtenerModulosPorUsuario = async ( req: Request, res: Response ) => {
        try {
            const token = req.header("x-auth");
            const data = getTokenData(token);
            const usuario:any = await Usuario.findByPk(data.uid);

            if (!usuario) {
                return res.status(200).json(new SimpleResponse(true,'Token invalido',{}))
            }
            //Obtener modulos por rol de usuario
            const modulos:any = await RolOpcion.findAll({
                attributes:['menu.modulo.id'],
                where: {
                    rolId: usuario.rolId
                },
                having:{
                    'menu.id': {
                        [Op.ne]: null
                    }
                },
                // order: [ [Menu,'order','asc'] ],
                order: [ [ 'menuId','ASC' ] ],

                group: ['menu.modulo.id'],
                include:
                    [
                        {
                            attributes: ['id'],
                            model: Menu,
                            as: 'menu',
                            include: [{
                                attributes: ['id','nombre','url','imagen'],
                                where: {
                                    estado: 1,
                                    visible: true
                                },
                                model: Modulo,
                                as: 'modulo'
                            }],
                        }
                    ]

            });
            // filtrar solo columna modulos
            const soloModulos = modulos.map((item)=>{
                if (item.menu) {
                    return item.menu.modulo;
                }
            });
            return res.json(new SimpleResponse(false,'ModulosPorUsuario',soloModulos))
        } catch (error) {
            console.log(error);
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
    }


    

  

}




export default Modules;