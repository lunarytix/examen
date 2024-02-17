import RepositoryBase from "../../controllers/repository-base";
import SimpleResponse from "../../objects/simple-response";
import dotenv from "dotenv";
dotenv.config();
import moment from "moment";
import sequelize from "sequelize";
import Prospecto from "../models/prospecto";
import { Request, Response } from "express";
import { Op } from "sequelize";


class Prospectos extends RepositoryBase{
    constructor() {
        super(Prospecto,'Prospectos',{ 
            nombre: '' ,
            apellidoP: '' ,
            apellidoM: '',
            calle: '' ,
            colonia: '' ,
            numero: '' ,
            codigoPostal: '' ,
            telefono: '' ,
            rfc: '' ,
            estado: '' ,
            fecha: undefined,
            autorizacion: '' ,
        })
    }

    buscarTodo = async (req: Request , res: Response) => {
       
        // let { inicial, final } = req.body;
        // inicial = moment(inicial).format('YYYY-MM-DD 00:00:00')
        // final = moment(final).format('YYYY-MM-DD 23:59:59')


        try {
             let resultSet = await Prospecto.findAll({
                 where: {
                     estado: 1,
                    //  fecha: {
                    //     [Op.between]: [inicial,final]
                    //  }
                 },
                //  where: {
                //     estado: 1,
                //     fecha: {
                //         [Op.gt]: inicial,
                //         [Op.lt]: final,
                //       },
                // },
                 
                 
                 raw:true
             })
             
             // resultSet.forEach(element => {
             //     element["fecha"] = moment(element["fecha"]).format('YYYY-MM-DD HH:mm:ss')
             // });
           
         res.status(200).json( new SimpleResponse(false,'buscarPorFechas',resultSet) );
         
        } catch (error) {
         res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
     }

    buscarPorFechas = async (req: Request , res: Response) => {
       
        let { inicial, final } = req.body;
        inicial = moment(inicial).format('YYYY-MM-DD 00:00:00')
        final = moment(final).format('YYYY-MM-DD 23:59:59')


        try {
             let resultSet = await Prospecto.findAll({
                 where: {
                     estado: 1,
                     fecha: {
                        [Op.between]: [inicial,final]
                     }
                 },
                //  where: {
                //     estado: 1,
                //     fecha: {
                //         [Op.gt]: inicial,
                //         [Op.lt]: final,
                //       },
                // },
                 
                 
                 raw:true
             })
             
             // resultSet.forEach(element => {
             //     element["fecha"] = moment(element["fecha"]).format('YYYY-MM-DD HH:mm:ss')
             // });
           
         res.status(200).json( new SimpleResponse(false,'buscarPorFechas',resultSet) );
         
        } catch (error) {
         res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
     }

    autorizacionProspecto = async (req: Request, res: Response) => {
        const id =  req.params.id;
        try {
            
            let autorizo = await Prospecto.findOne({
                where: {
                    // estado: 1,
                    id
                },
                raw:true
            })
            // console.log( 'autorizo : ' ,  autorizo)
            // if(autorizo?.["autorizacion"] === true){
            //     console.log( 'verdadero : ' ,  autorizo?.["autorizacion"])
            // }else{
            //     console.log( 'falso : ' ,  autorizo?.["autorizacion"])

            // }   
            const resultSet = await Prospecto.findByPk(id).then((obj)=> obj?.update({
                autorizacion: !autorizo?.["autorizacion"]
            })) || {};
    
            
            res.status(200).json( new SimpleResponse(false, 'autorizacion' ,resultSet) );
        } catch (error) {
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
    }

    //  autorizacion = async (req: Request , res: Response) => {
       
    //     let { inicial, final } = req.body;
    //     inicial = moment(inicial).format('YYYY-MM-DD 00:00:00')
    //     final = moment(final).format('YYYY-MM-DD 23:59:59')


    //     try {
    //          let resultSet = await Prospecto.update({
    //              where: {
    //                  estado: 1,
    //              },

               
                 
    //              raw:true
    //          })
             
    //          // resultSet.forEach(element => {
    //          //     element["fecha"] = moment(element["fecha"]).format('YYYY-MM-DD HH:mm:ss')
    //          // });
           
    //      res.status(200).json( new SimpleResponse(false,'buscarPorFechas',resultSet) );
         
    //     } catch (error) {
    //      res.status(400).json( new SimpleResponse(true, 'error' ,error) );
    //     }
    //  }

}

export default Prospectos ;