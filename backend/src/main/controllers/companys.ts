import { Request, Response } from "express";
import { Op } from "sequelize";
import Empresa from "../models/empresa";
import UsuarioEmpresa from "../models/usuario-empresa";
import SimpleResponse from "../objects/simple-response";
import RepositoryBase from "./repository-base";

class Companys extends RepositoryBase {
    constructor() {
        super(Empresa,'Company',
            {
                razonSocial: '',
                nombreComercial: '',
                correo: '',
                direccion: '',
                latitud: '',
                longitud: '',
                telefono: ''
            }
        );
    }

    obtenerEmpresasPorUsuario = async ( req: Request, res: Response )  => {
        /*Empresas asignadas */
        let empresasPermitidas:any = await UsuarioEmpresa.findAll({
            attributes: ['empresaId'] ,
            where:{ usuarioId: req.body.usuario.id },
            raw: true
        });
        if (!empresasPermitidas) {
            return res.status(400).json( new SimpleResponse(true, 'No tiene empresas permitidas.' ,{}) );    
        }
        empresasPermitidas = empresasPermitidas.map( i => i.empresaId);
        /* empresaId: { [Op.in]: empresasPermitidas} */
        try {
            const resultSet = await Empresa.findAll({
                where: {
                    estado: 1,
                    id: { [Op.in]: empresasPermitidas}
                }
            }) || [];
    
            res.status(200).json( new SimpleResponse(false,`getAll${this.edentityName}s`,resultSet) );
        } catch (error) {
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
    }


    obtenerEmpresasPorUsuarioId = async ( req: Request, res: Response )  => {
        const id = req.params?.id;

        /*Empresas asignadas */
        let empresasPermitidas:any = await UsuarioEmpresa.findAll({
            attributes: ['empresaId'] ,
            where:{ usuarioId: id },
            raw: true
        });
        if (!empresasPermitidas) {
            return res.status(400).json( new SimpleResponse(true, 'No tiene empresas permitidas.' ,{}) );    
        }
        empresasPermitidas = empresasPermitidas.map( i => i.empresaId);
        /* empresaId: { [Op.in]: empresasPermitidas} */
        try {
            const empresasAsignadas = await Empresa.findAll({
                where: {
                    estado: 1,
                    id: { [Op.in]: empresasPermitidas}
                }
            }) || [];

            const porAsignar = await Empresa.findAll({
                where: {
                    estado: 1
                }
            }) || [];
    
            res.status(200).json( new SimpleResponse(false,`obtenerEmpresasPorUsuarioId`,{
                asignadas: empresasAsignadas,
                porAsignar
            }) );
        } catch (error) {
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
    }

    asignarEmpresasUsuario = async ( req: Request, res: Response ) => {
        let { empresas, id } = req.body;
        try {
            empresas = empresas.map(element => {
                return {
                    usuarioId: id,
                    empresaId: element.id
                }
            });

            //Eliminar empresas anteriores
            await UsuarioEmpresa.destroy( { where: { usuarioId: id }});

            //Registrar empresas
            const resultSet = await UsuarioEmpresa.bulkCreate(empresas);

            res.status(200).json( new SimpleResponse(false, 'asignarEmpresasUsuario' ,resultSet) ); 
        } catch (error) {
            res.status(400).json( new SimpleResponse(true, 'error' ,error) ); 
        }
    }
}

export default Companys;