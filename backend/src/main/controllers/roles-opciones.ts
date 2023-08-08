import { Request, Response } from "express";

import Menu from "../models/menu";
import RolOpcion from "../models/rol-opcion";
import Usuario from "../models/usuario";
import MenuInterface from "../objects/menu-object";
import SimpleResponse from "../objects/simple-response";
import RepositoryBase from "./repository-base";
import db from '../../databases/config';
import { QueryTypes } from 'sequelize';
import Opciones from "./opciones";
import Opcion from "../models/opcion";
import sequelize from "sequelize";

class RolesOpciones extends RepositoryBase {
    constructor() {
        super(RolOpcion,'RolOpcion',
            {
                rolId: '',
                menuId: '',
                opcionId: ''
            }
        );
    }

    // obtenerMenusUsuarioModulo = async (req: Request, res: Response) => {

    //     try {
    //         const modulo = req.params.id || 1;
    //         const modulos = await RolOpcion.findAll({
    //             where:{
    //                 '$menu.moduloId$': modulo
    //             },
    //             attributes:['id'],
    //             group: ['menu.id'],
    //             // order: ['m.id,m.padreId'],
    //             include: [
    //                         {
    //                             attributes: ['id','nombre','padreId','moduloId','icon','route'],
    //                             model: Menu,
    //                             as: 'menu',
    //                             // include: [
    //                             //     {
    //                             //         attributes: ['id','nombre'],
    //                             //         model:Modulo,
    //                             //         as: 'modulo'
    //                             //     }
    //                             // ]
    //                         }
    //                     ],

    //              }) || [];

    //         const menus = this.recorrerMenu(modulos);

    //         res.status(200).json( new SimpleResponse(false,'getModules',menus) );
    //     } catch (error) {
    //         res.status(400).json( new SimpleResponse(true, 'error' ,error) );
    //     }
    // }





    obtenerMenusUsuarioRuta = async (req: Request, res: Response) => {
        const { ruta ,  usuario } = req.body;
        // buscar menu por su ruta
        const menu:any = await Menu.findOne({
            where:{
                estado: 1,
                route: ruta
            },
            
        });


        if ( !menu ) {
            return res.status(401).json(new SimpleResponse(true,"Acceso desconocido",{}))
        };
        
        // Verificar si el usuario tiene permiso para ver este menu
        const tieneAcceso:any = await RolOpcion.findOne({
            where:{
                menuId: menu.id,
                rolId: usuario.rolId
            }
        });
         if (!tieneAcceso) {
            return res.status(401).json(new SimpleResponse(true,"Acceso restringido.",{}))
        }
        const opciones = tieneAcceso['opcion.opciones'];

        try {

            const modulos = await RolOpcion.findAll({
                where:{
                    //falta el where con el rol
                    'rolId': usuario.rolId,
                    '$menu.moduloId$': menu.moduloId,
                    estado: true
                },
                attributes:['id','menuId'],
                include: [
                            {
                                attributes: ['id','nombre','padreId','moduloId','icon','route',
                                ],
                                model: Menu,
                                as: 'menu',
                                where: {estado: true},
                            },
                            {
                                attributes: ['id',
                                [sequelize.fn('GROUP_CONCAT', sequelize.col('opcion.nombre')), 'nombre']
                                ],
                                model: Opcion,
                                as: 'opcion',
                                where: {estado: true}
                            }
                        ], 
                        group: ['menu.id'],



                        // raw: true
                 }) || [];
             const menus = this.recorrerMenu(modulos);
 
            res.status(200).json( new SimpleResponse(false,'getModules',{menus}) );
        } catch (error) {
             res.status(400).json( new SimpleResponse(true, `${error}` ,error) );
        }

    }

    /*Esta opcion se usa para asignar permisos en modulo de configuración */
    obtenerTodasOpcionesPorUsuario = async (req: Request, res: Response) => {

        try {

            const id = req.params.id;
            const usuario:any = await Usuario.findOne({where: {id: id}});

            if (!usuario) {
                return res.status(401).json(new SimpleResponse(true,'Operación no valida',[]))
            }

            const permisos = await db.query(`SELECT m.id moduloid,m.nombre modulo,
                                                    me.id menuId,me.nombre menu,
                                                    GROUP_CONCAT(concat(o.id,'-',o.nombre), '') opciones,
                                                    GROUP_CONCAT(concat(op.id,'-',op.nombre), '') opcionesProp,
                                                    me.padreId
                                                    from Modulos m
                                            inner join Menus me on me.moduloId = m.id
                                            LEFT JOIN MenusOpciones mo on mo.menuId = me.id
                                            LEFT JOIN Opciones o on o.id = mo.opcionId

                                            LEFT JOIN RolesOpciones ro on ro.rolId = ${usuario.rolId}
                                            and ro.menuId = me.id and ro.opcionId = mo.opcionId
                                            LEFT JOIN Opciones op on op.id = ro.opcionId

                                            GROUP by me.id `,{
                    type: QueryTypes.SELECT
                })


            const menus =  this.agruparMenus(permisos);
            res.status(200).json( new SimpleResponse(false,'obtenerTodosMenus',menus) );
        } catch (error) {
            console.log(error);
            res.status(400).json( new SimpleResponse(true, 'error 1' ,error) );
        }
    }
    /**/
    /* */
    asignarPermisos = async (req: Request, res: Response) => {

        try {
            const {id , opciones, padres } = req.body;
            const usuario:any = await Usuario.findOne({where: {id: id}});

            if (!usuario) {
                return res.status(401).json(new SimpleResponse(true,'Operación no valida',[]))
            }

             const batchOpcionesPadres:any[] = [];

             padres.forEach( (modulo:any) => {

                  modulo?.forEach( item => {
                    // console.log(item);

                    batchOpcionesPadres.push({
                        opcionId: 1,
                        menuId: item.menuId,
                        rolId: usuario.rolId
                    })
                })
                
            });

            const batchOpciones:any[] = [];
            opciones.map( (menus:any) => 
            {
                menus.map( item => {
                    // AGREGAR PADRE DE MENU EN CASO DE QUE NO VENGA
                    if (item.raiz) {
                        batchOpciones.push({
                          opcionId: 1,
                          menuId: item.raiz,
                          rolId: usuario.rolId
                      })
                    }
                    //
                    batchOpciones.push({
                        opcionId: Number(item.id),
                        menuId: item.padreId,
                        rolId: usuario.rolId
                    })
                })
            });
            //Quitar duplicados en caso de que haya
            const idsUnicos:string[] = [];
            const uniqueArr = [...batchOpcionesPadres,...batchOpciones].map((item,index) => {
                const unico:string = `${item.menuId}-${item.opcionId}`;
                if (!idsUnicos.includes(unico)) {
                    idsUnicos.push(unico);
                    return item;
                }
            }).filter(element => element);

            // console.log(uniqueArr);
            // console.log(uniqueArr.length);

          
            //Eliminar permisos anteriores
            await RolOpcion.destroy( { where: { rolId: usuario.rolId }});
            // Insertar nuevos permisos
            const builk = await RolOpcion.bulkCreate( uniqueArr );
            res.status(200).json(new SimpleResponse(false, 'asignarPermisos' , builk ))
        } catch (error) {
            console.log(error);
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
    }
/* Este metodo recorre los menus y los retorna con un formato legible para el front, para visualizar
  los menus en sidenav
*/

    private recorrerMenu = ( data:any[] ) => {
        let response:any[] = [];
        
        //Recorrer todos los menus ya que vienen en modo lineal (hijos y padres)
        //De momento esta limitado a 1 submenus
        for (let index = 0; index < data.length; index++) {
             const recordObj:MenuInterface = {
                                            menu: data[index].menu.nombre,
                                            menuId:   data[index].menu.id,
                                            padreId:   data[index].menu.padreId,
                                            moduloId:   data[index].menu.moduloId,
                                            icono: data[index].menu.icon,
                                            route: data[index].menu.route,
                                            opciones: data[index].opcion.nombre,
                                            hijos: []};
            /*Esta condicion los asigna a sus padres */                                
            if (!recordObj.padreId) {
                const { menuId,padreId, ...responseObj} = recordObj;
                response[recordObj.menuId] = responseObj;
            }else{
                const { menuId,padreId,  ...responseObj} = recordObj;
                response[recordObj.padreId]?.hijos.push( responseObj )
            }
            /* */                                
        }
        //Se eliminan los espacios nulos
        response = response.filter(e => String(e).trim());
        return response;
    } 

    /*
    Este metodo agrupa los menus y opciones de la manera que lo requiere el Tre View de angular material,
    tambien revisa que opciones tiene asignadas el usuario y le pone una bandera de check
    */
    private agruparMenus = ( menus: any[] ):any => {
        const respuesta: any[] = [];

        const modulos = menus.reduce((group, product) => {
            const { modulo } = product;
            group[modulo] = group[modulo] ?? [];
            group[modulo].push(product);
            return group;
          }, {});


          for(const item in modulos){
            respuesta.push({item , "children": modulos[item].filter(element => !element.padreId ).
            map(itemPadre => {
                return {
                    item: itemPadre.menu,
                    menuId: itemPadre.menuId, 
                    //Si el menu principal tiene opciones (ejemplo: Sistemas que no tiene opciones de eliminar,editar,etc)
                    children:
                    itemPadre.opciones ? itemPadre.opciones.split(',').map(opcion => {
                        let checked = false;
                        itemPadre.opcionesProp?.split(',').map( propia => {
                                            if (opcion.split('-')[0] === propia.split('-')[0]) {
                                                checked = true;
                                            }
                                        });

                         return {
                               id: opcion.split('-')[0],
                               item: opcion.split('-')[1],
                               padreId: itemPadre.menuId,
                               isChecked: checked
                           }
                    }) :
                            //De lo contrario busca si tiene hijos
                            menus.filter(element => element.padreId === itemPadre.menuId ).map(item => {
                                return {
                                    item: item.menu,
                                    menuId: item.menuId,
                                    children: item.opciones?.split(',').map( itemOpcion => {
                                        // Verificar si la opciones esta asignada a el usuario
                                        let checked = false;
                                         item.opcionesProp?.split(',').map( propia => {
                                            if (itemOpcion.split('-')[0] === propia.split('-')[0]) {
                                                checked = true;
                                            }
                                        });
                                        //
                                         return {
                                            id: itemOpcion.split('-')[0],
                                            item: itemOpcion.split('-')[1],
                                            padreId: item.menuId,
                                            raiz: itemPadre.menuId,
                                            isChecked: checked
                                        }
                                    })
                                }
                            })
                }
            })});

          }
           return respuesta;
      }



}

export default RolesOpciones;