import Opcion from "../models/opcion";
import RepositoryBase from "./repository-base";

class Opciones extends RepositoryBase {
    constructor() {
        super(Opcion,'Opciones',
            {
                rolId: '',
                menuId: '',
                opcionId: ''
            }
        );
    }
}

export default Opciones;