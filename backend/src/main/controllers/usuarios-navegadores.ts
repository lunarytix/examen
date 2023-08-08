import RepositoryBase from './repository-base';
import UsuarioNavegador from '../models/usuario-navegador';

class UsuariosNavegadores extends RepositoryBase {
    constructor() {
        super(UsuarioNavegador,'UsuarioNavegador',{
            usuarioId: '',
            navegadorId: ''
        })
    }
}

export default UsuariosNavegadores;