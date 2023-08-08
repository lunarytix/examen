import Area from '../models/area';
import RepositoryBase from './repository-base';

class Areas extends RepositoryBase{
    constructor() {
        super(Area,'Area',{
            nombre: '',
            descripcion: ''
        })
    }
}

export default Areas;