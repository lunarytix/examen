import Navegador from '../models/navegador';
import RepositoryBase from './repository-base';

class Navegadores extends RepositoryBase{
    constructor() {
        super(Navegador,'Navegador',{
            endpoint:'',
            auth:'',
            sha:''
        })
    }
}

export default Navegadores;