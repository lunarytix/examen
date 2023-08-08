import UsuarioEmpresa from "../models/usuario-empresa";
import RepositoryBase from "./repository-base";

class UsuariosEmpresas extends RepositoryBase {
    constructor() {
        super(UsuarioEmpresa,'UsuarioEmpresa',
            {
                usuarioId: '',
                empresaId: ''
            }
        );
    }
}

export default UsuariosEmpresas;