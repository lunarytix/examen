import jwt, { JwtPayload } from "jsonwebtoken";
import { Response,Request } from "express";
import User from '../models/usuario';
import SimpleResponse from "../objects/simple-response";


const validateToken = async ( req:Request , res: Response , next: () => void) => {
    // await new Promise(resolve => {
    //     setTimeout(() => {
    //       resolve('nel');
    //     }, 2000);
    //   });

    const token = req.header("x-auth");
    if (!token) {
        return res.status(401).json(new SimpleResponse(true,'Token requerido',{}) );
    }

    try {
        // console.log("entre");
        const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY || '') as JwtPayload;
        const usuario =  await User.findByPk(uid);
        
        if (!usuario) {
            return res.status(401).json(new SimpleResponse(true,'Usuario no se encuentra registrado',{}) );
        };

        if (usuario?.getDataValue("estado") !== 1) {
            return res.status(401).json(new SimpleResponse(true,'Usuario invalido. estatus',{}) );
        }
       // req.usuario = usuario;
        req.body.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json(new SimpleResponse(true,'Token no valido',{}) );
    }

}

export {
    validateToken
}