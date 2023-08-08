import Checador from "../models/checador";
import RepositoryBase from './repository-base';

class Checadores extends RepositoryBase{
    constructor() {
        super(Checador,'Checador',{
            checadorId: '',
            areaId: '',
            esJefe: false
        });
    }
}

export default Checadores;