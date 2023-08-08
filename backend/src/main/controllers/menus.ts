import Menu from "../models/menu";
import RepositoryBase from "./repository-base";

class Menus extends RepositoryBase {
    constructor() {
        super(Menu,'Menu',
            {
                nombre: '',
                icon: '',
                route: ''
            }
        );
    }


}

export default Menus;