import express, {Application} from "express";
import cors from "cors";
import db from '../databases/config';
import { routesAuths,routesCompanys,routesUsers ,routesModules, 
         routesMenus, routesMenuOpciones, routesRoles, routesOpciones, routesRolesOpciones, routesAreas, routesChecadores, routesNavegadores, routesUsuariosNavegadores} from "../main/routes/index.routes";

class Server {

    private app: Application;
    private port: number;
    private apiPath = {
        users: '/api/users',
        auth: '/api/auth',
        company: '/api/companys',
        module: '/api/modules',
        menus: '/api/menus',
        opciones: '/api/opciones',
        menuopciones: '/api/menuopciones',
        roles: '/api/roles',
        rolesopciones: '/api/rolesopciones',

        navegadores: '/api/navegadores',
        usuariosNavegadores: '/api/usuariosNavegadores',
        areas: '/api/areas',
        checadores: '/api/checadores'
    };

    private apiPathRH = {
        buzon: '/api/recursoshumanos/buzon',
        tiposincidencias: '/api/recursoshumanos/tiposincidencias',
        comentariosReportes: '/api/recursoshumanos/buzon/comentarios',
        estadosReportes: '/api/recursoshumanos/estadosreportes',
        tiposReportes: '/api/recursoshumanos/tiposreportes'
    }

    private aptPathSCT = {
        dictamenes: '/api/sct/dictamenes',
        citas: '/api/sct/citas/',
        admisiones: '/api/sct/admisiones/',
        admisionesExcluir: '/api/sct/admisionesExcluir',
        paquetes: '/api/sct/paquetes'
    }

    private apiPathTableros = {
        general: '/api/tableros/general',
        comercial: '/api/tableros/comercial',
        finanzas: '/api/tableros/finanzas',
        operacion: '/api/tableros/operacion',
        reportes: '/api/tableros/reportes'

    }

    constructor() {

        this.app =  express();
        this.port = Number(process.env.PORT) || 8000;
        this.dbaccess();
        this.middlewares();
        this.routes();
    }

    async dbaccess():Promise<void>{
        try {
            db.authenticate();
            console.log("db online");
        } catch (error) {
            console.error( `Error db: ${ error } `);
        }
    }

    middlewares = ():void => {
        this.app.use( cors() );
        // this.app.use( express.urlencoded( { extended: false }) );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        this.app.use('/public', express.static('public'));
        // this.app.set('view engine', 'hbs');
    }

    routes = ():void => {
        this.app.use(this.apiPath.users ,routesUsers);
        this.app.use(this.apiPath.auth ,routesAuths);
        this.app.use(this.apiPath.company ,routesCompanys);
        this.app.use(this.apiPath.module ,routesModules);
        this.app.use(this.apiPath.menus ,routesMenus);
        this.app.use(this.apiPath.opciones ,routesOpciones);
        this.app.use(this.apiPath.menuopciones ,routesMenuOpciones);
        this.app.use(this.apiPath.roles ,routesRoles);
        this.app.use(this.apiPath.rolesopciones ,routesRolesOpciones);

        this.app.use(this.apiPath.areas ,routesAreas);
        this.app.use(this.apiPath.checadores ,routesChecadores);
        this.app.use(this.apiPath.navegadores ,routesNavegadores);
        this.app.use(this.apiPath.usuariosNavegadores ,routesUsuariosNavegadores);

    }

    

    listen = ():void => {
        this.app.listen( this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }

}

export default Server;