import Rol from "../models/rol";
import RepositoryBase from "./repository-base";

class Roles extends RepositoryBase {
    constructor() {
        super(Rol,'Rol',
            {
                nombre: '',
                descripcion: ''
            }
        );
    }
}

export default Roles;