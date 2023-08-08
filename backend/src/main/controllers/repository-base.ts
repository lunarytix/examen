import {  ModelStatic } from "sequelize/types";
import { Request, Response } from "express";

import SimpleResponse from "../objects/simple-response";

class RepositoryBase {
  
    protected model!:  ModelStatic<any>;
    protected edentityName!: string;
    protected attributes!: {};

    
    constructor(model: ModelStatic<any>,edentityName:string,attributes:{} = {}) {
        this.model = model;
        this.edentityName = edentityName;
        this.attributes = attributes;
    }
    
    
    getAll = async ( req: Request, res: Response ) => {
       
        try {
            const resultSet = await this.model.findAll({
                where: {estado: 1}
            }) || [];
    
            res.status(200).json( new SimpleResponse(false,`getAll${this.edentityName}s`,resultSet) );
        } catch (error) {
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }

      }
    
      getPK = async (req: Request, res: Response) => { 
        const id = req.params.id;
        try {
            const resultSet = await this.model.findByPk(id) || {};
            res.status(200).json( new SimpleResponse(false,`get${this.edentityName}ById`,resultSet) );
        } catch (error) {
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
      }
    
      create = async ( req: Request, res: Response ) => { 
        try {
            for (const item in this.attributes) {
              this.attributes[item] = req.body[item]
            }
             const resultSet = await this.model.create( this.attributes );
    
            res.status(200).json( new SimpleResponse(false,`create${this.edentityName}`,resultSet) );
        } catch (error) {
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
      }
    
      update = async (req: Request, res: Response) => { 
        try {
            const id = req.params.id;
            
            for (const item in this.attributes) {
              this.attributes[item] = req.body[item]
            }
            
            const resultSet = await this.model.findByPk(id).then((obj)=> obj?.update( this.attributes )) || {};
    
            res.status(200).json( new SimpleResponse(false,`update${this.edentityName}`,resultSet));
        } catch (error) {
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
      }
    
      disabledRow = async (req: Request, res: Response) => {
        const id =  req.params.id;
        try {
            const resultSet = await this.model.findByPk(id).then((obj)=> obj?.update({
                estado: 0
            })) || {};

            if (!resultSet){
              return res.status(400).json( new SimpleResponse(true, `${this.edentityName} no se encuentra registrad@` ,{}) );
            }                
            res.status(200).json( new SimpleResponse(false, `delete${this.edentityName}` ,resultSet) );
        } catch (error) {
            res.status(400).json( new SimpleResponse(true, 'error' ,error) );
        }
      }
}

export default RepositoryBase;