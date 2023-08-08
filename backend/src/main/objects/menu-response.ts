class MenuResponse {
    
    protected nombre: string;
    protected icono: string;
    protected route: string;
    protected permisos?: [];
    protected hijos?: MenuResponse[];
    protected check: boolean;
    
    constructor(  ) {
        this.nombre = '';
        this.icono = '';
        this.route = '';
        this.permisos = [];
        this.hijos = [];
        this.check = false;
    }
    
}

export default MenuResponse;