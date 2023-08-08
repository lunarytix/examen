import MenuOpcion from "../models/menu-opcion";
import RepositoryBase from "./repository-base";

class MenuOpciones extends RepositoryBase {
    constructor() {
        super(MenuOpcion,'MenuOpcion',
            {
                nombre: '',
                descripcion: ''
            }
        );
    }
}

// Borrar es prueba para crear modelo
// class MenuOpciones2 extends RepositoryBase {
//     constructor() {
//         super(UsuarioModulo,'UsuarioModulo',
//             {
//                 nombre: '',
//                 descripcion: ''
//             }
//         );
//     }
// }


export default MenuOpciones;