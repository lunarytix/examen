import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import generador from 'generate-password';
import fetch from 'node-fetch';
import Usuario from '../models/usuario';
import { generateToken, getTokenData } from "../helpers/json_wt";
import SimpleResponse from "../objects/simple-response";
import Rol from "../models/rol";
import RolOpcion from "../models/rol-opcion";
import Menu from "../models/menu";
import { Op } from "sequelize";
import UsuarioEmpresa from "../models/usuario-empresa";
import { GoogleAuth, OAuth2Client } from "google-auth-library";

class Auth {
    
    login = async (req:Request, res:Response ) => {
        const { correo, password } = req.body;
    
        const usuario:any =  await Usuario.findOne({
                where:{ correo: correo.toUpperCase(), estado: true }
            });
        // Usuario existe?
        if (!usuario){
            return res.status(401).json(new SimpleResponse(true,`El usuario ${correo} no se encuentra registrado.`, {}));
        }

        // Usuario verificado?

        if (!usuario.verificado){
            return res.status(401).json(new SimpleResponse(true,`El usuario ${correo} tiene verificación pendiente.`, {}));
        }

        // Verificar contraseña
        // usuario?.getDataValue("password") == usuario.password (TS lo dectecta como error en vscode)
        const validPassword = bcryptjs.compareSync(password, usuario?.getDataValue("password") || '');
        if (!validPassword) {
            return res.status(401).json(new SimpleResponse(true,"Usuario o contraseña no es correcta, verifiquela.",{}));
        }
    
        // Generar JWT
        const token:any = await generateToken( usuario?.getDataValue("id"), usuario?.getDataValue("correo") );
        res.status(200).json( new SimpleResponse(false, token , usuario) );
    }
        // Login cn Google

    loginGoogle = async (req:Request, res:Response ) => {
        // const { usuario } = req.body;
        const usuarioReq = req.body.usuario;
        const tokenReq = req.body.token;
        //Verificar si el usuario con el correo existe y esta habilitado
        let usuario:any =  await Usuario.findOne({
            where:{ 
                correo: usuarioReq?.email?.toUpperCase(), 
                estado: true ,
                // tokenGoogle: tokenReq
            }
        });

        const tokenVerficado:any = await this.verificarTokenGoogle(tokenReq,usuario);
        if (!tokenVerficado) {
            return res.status(401).json(new SimpleResponse(true,`Error: Token invalido!!!`, {}));
        }

        // await this.verificarTokenGoogle('eyJhbGciOiJSUzI1NiIsImtpZCI6ImI0OWM1MDYyZDg5MGY1Y2U0NDllODkwYzg4ZThkZDk4YzRmZWUwYWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzYzMTA0NjksImF1ZCI6IjI1MTk0NzE4ODk1Ni03YWszcGhtMmo5dDlwaW9pMWkxa21hMmpwMWxjYXRkZy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMDMyMTA1NzM5OTcxNTU5NjU3NCIsImhkIjoibWVkaWNhZGVsYWNpdWRhZC5jb20iLCJlbWFpbCI6ImlybGFuZGFAbWVkaWNhZGVsYWNpdWRhZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiMjUxOTQ3MTg4OTU2LTdhazNwaG0yajl0OXBpb2kxaTFrbWEyanAxbGNhdGRnLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IklybGFuZGEgT3Jkb8OxZXogS2VsbHkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNTRLZjRVdnVvSEhidFJWbXRTVXpWMWdITGZ6cUdidjRKQ280bWc9czk2LWMiLCJnaXZlbl9uYW1lIjoiSXJsYW5kYSAiLCJmYW1pbHlfbmFtZSI6Ik9yZG_DsWV6IEtlbGx5IiwiaWF0IjoxNjc2MzEwNzY5LCJleHAiOjE2NzYzMTQzNjksImp0aSI6ImEyOGFhZTVlZWY1ZTQxNjAyMzg2NTNiNzMyYjlmNjI2YTU0ZWE0OWMifQ.mZ42xE9tidMzEDuirRy1vcWm3pyFpxaSozITMtrGxnrtuy3iP83NPuIj2y4sVesaG9Hi471P6Z-Z40hbzUcdV2yQ1WDc65i99VIicAgaFBm3XkGnvyKfgWy9lO3jIFGON_UE7r-3Xob4rV7bqwp-b10XCw4giclJk07fkfUEZ4s62CMtWNx_LPnDoK_mIXUg__Ur1ssG9WIBkzBpe7SR-2Ad__zqOgAYuwsaAAGxBPUpbcgOAhVoq7Ks8omSnn4bVrBTNTS14KA20pI_VChLq0L4RgSLljyXegquQIZ24lHDIt02o4G2oUQDxZz6WR1YtRpGX8F9D8hTps_dNpzI8g');

        // Usuario existe?
        if (!usuario && tokenVerficado){
            // return res.status(401).json(new SimpleResponse(true,`El usuario ${usuarioReq?.email} no se encuentra registrado.`, {}));
            const registroGoogle = await this.registroGoogle(usuarioReq,tokenReq);
            if (!registroGoogle) {
                return res.status(401).json(new SimpleResponse(true,`Error al registrar usuario Google.`, {}));
            }
            //Asignar a la varible usuario, el nuevo usuario registrado en la variable registroGoogle
            usuario = registroGoogle;
        }

        // Generar JWT para el uso del sistema
        const token:any = await generateToken( usuario?.getDataValue("id"), usuario?.getDataValue("correo") );
        res.status(200).json( new SimpleResponse(false, token , usuario) );
    }

    // Verificar Token Google
    private verificarTokenGoogle = async (token: string,usuario:any) =>{
        try {
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const datos = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });        
            const payload = datos.getPayload();
            //Si el usuario es nuevo, no debe validar vs otro correo
            if (!usuario) {
                return true;
            }
            //Validar si la informacion de token coincide con el correo enviado por request
            if (usuario?.correo.toUpperCase() !== payload?.email?.toUpperCase()) {
                return false;
            }
            //Default
            return true;
        } catch (error) {
            return false;
        }
    }

    //
    private registroGoogle = async (usuarioBody: any,token: string) => {
        try {
            
            //Registrar usuario
            const usuario:any = await Usuario.create({
                nombre: usuarioBody?.given_name.toUpperCase(),
                apellidoP: usuarioBody?.family_name.toUpperCase(),
                correo: usuarioBody?.email.toUpperCase(),
                avatar: usuarioBody?.picture,
                tokenGoogle: token,
                verificado: true
            });
            
        
            // Crear Rol para usuario
            const nuevoRol:any = await Rol.create({
                nombre: `ROL_${usuario.id}_${usuario.correo}`,
                descripcion: `ROL_${usuario.id}_${usuario.correo}`
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
            if (!menuDefault) {
                menuDefault.id = usuario.rolId;
            }
            await RolOpcion.create({
                rolId: nuevoRol.id,
                menuId: menuDefault.id,
                opcionId: 1
            });
            //

            // Actualizar usuario
            // usuario.verificado = 1;
            usuario.rolId = nuevoRol.id;
            await usuario.save();
         return usuario;
        } catch (error) {
            console.log(error)
         return false;
        }
    }
    
        // Renovar Token
    renewToken = async (req:Request, res:Response) => {
        const usuario = req.body.usuario ;
        const token:any = await generateToken(usuario.id,usuario.correo);
    
        res.status(200).json(new SimpleResponse(false, token ,usuario))
        return token;
    }
    // validar si el usuario puede acceder a esta ruta
    validarRuta = async (req:Request, res:Response) => {
        const usuario = req.body.usuario ;
        const token:any = await generateToken(usuario.id,usuario.correo);

    }
        // Cambiar Contraseña
    changePassword = async (req:Request, res:Response) => {
        try {
            const token = req.header("x-auth");
            const { password } = req.body;
    
            const data = getTokenData(token);
            const { correo } = data;
    
    
            const salt = await bcryptjs.genSalt(10);
            const pwd = await bcryptjs.hash(password, salt);
    
            const user = await Usuario.findOne({
                where: {correo}
            }).then((obj)=> obj?.update({
                password: pwd
            }));
    
            return res.status(200).json({ error: false, msg: user });
        } catch (error) {
            return res.status(400).json({ error: true, msg: error })
        }
    }


    registrarUsuario = async (req:Request, res:Response) => {

        try {
            let { nombre,apellidoP,apellidoM,correo,telefono,empresaId } = req.body;  
             
            //Verficar si el correo esta registrado con otro usuario
            const usuario =  await Usuario.findOne({
                where:{ correo, estado: true }
            });
            //Verficar si el correo esta registrado con otro usuario
            if (usuario) {
                return res.status(400).json(new SimpleResponse(true,'Este correo ya se encuentra registrado.',{}));
            }    
            const rolGenerico:any = await Rol.findOne({
                where:{ nombre: 'GENERICO'}
            });

            if (!rolGenerico) {
                return res.status(400).json(new SimpleResponse(true,'No existe un rol, favor de contactar al administrador.',{}));
            }   

            const password = generador.generate({
                length: 12,
                numbers: true,
                symbols:true
            })
            
            const salt = await bcryptjs.genSalt(10);
            const pwd = await bcryptjs.hash(password, salt);
            //Registrar usuario
            const payload:any = await Usuario.create({
                nombre: nombre?.toUpperCase(),
                apellidoP: apellidoP?.toUpperCase(),
                apellidoM: apellidoM?.toUpperCase(),
                correo: correo?.toUpperCase(),
                telefono,
                empresaId,
                password: pwd,
                rolId: rolGenerico.id
            });
            // Registrar relacion empresa-usuario en la tabla de relacion UsuariosEmpresas
            await UsuarioEmpresa.create({
                usuarioId: payload.id,
                empresaId
            });
            /********************************************************************************/
            //Enviar Correo
            const token:any = await generateToken(payload.id, correo);
             const peticion = await fetch(`${process.env.SERVICE_MAIL}/enviar`,{
                method: 'POST',
                body: JSON.stringify( this.templateVerificarCuenta(payload,token,password) ),
                headers: {'Content-Type':'application/json'}
            });
            const response =  await peticion.json();
             if (response.error) {
                return res.status(400).json( new SimpleResponse(true,response.msg + "<?=",{}) )
            }
            /********************************************************************************/

            res.status(200).json(new SimpleResponse(false,`Usuario registrado correctamente, se ha enviado un correo a ${correo}, favor de verificar su cuenta.`,payload));
        } catch (error) {
            res.status(400).json(new SimpleResponse(false,`${error}`,error));
        }
    }

    
    verificarCuenta =  async (req:Request, res:Response) => {
        try {
            const { token } = req.params;
            const data:any = await getTokenData(token);

            if (!data) {
                return res.status(400).json( new SimpleResponse(true,"Token invalido.",{}) );
            }
             const usuario:any = (await Usuario.findOne({ 
                where:{
                    correo: data.correo,
                    id: data.uid
                }
            })) ;

            if (!usuario) {
                return res.status(400).json( new SimpleResponse(true,`Correo ${data.correo} no localizado.`,{}) );
            }

            if (usuario.verificado) {
                res.redirect("/index.html");
                return;
            }

            // Crear Rol para usuario
            const nuevoRol:any = await Rol.create({
                nombre: `ROL_${data.uid}_${data.correo}`,
                descripcion: `ROL_${data.uid}_${data.correo}`
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
            if (!menuDefault) {
                menuDefault.id = usuario.rolId;
            }
            await RolOpcion.create({
                rolId: nuevoRol.id,
                menuId: menuDefault.id,
                opcionId: 1
            });
            //

            // Actualizar usuario
            usuario.verificado = true;
            usuario.rolId = nuevoRol.id;
            await usuario.save();


            res.send(`<h1>¡En Horabuena!, ahora puedes accerder a la plataforma: <a href="${process.env.BASE_FRONT}"> Clic! </a></h1>`);
        } catch (error) {
            return res.status(400).json( new SimpleResponse(true,`${error}`,error) );
        }
    }

    templateVerificarCuenta = (usuario:any,token:string,password:string) => {
        return {
            destinatario: usuario.correo,
            asunto: `Verificación de cuenta`,
            template : `<h1>¡Buen día ${usuario.nombre} ${usuario.apellidoP} ${usuario.apellidoM || ''}!</h2>
                        <h3>Estas a un paso de poder ingresar a nuestra plataforma,
                            favor de verificar haciendo clic en este  
                        <a href="${process.env.BASE_URL}/api/auth/verificarCuenta/${token}">Enlace</a>
                        </h3>
                        <h3>Acceso a la plataforma: <br>
                            Correo: <b>${usuario.correo}</b><br>
                            Contrasena: <b>${password}</b></h3>`.trim()
        };
    }
    
}


export default Auth;