import { DataTypes, Model } from 'sequelize';
import db from '../../databases/config';
import Menu from './menu';
import Opcion from './opcion';
const PROTECTED_ATTRIBUTES = ['estado','createdAt','updatedAt']

class MenuOpcion extends Model {
    
    toJSON = () => {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
}
MenuOpcion.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estado:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        get(){}
    }
},{
    sequelize: db,
    timestamps: true,
    tableName: 'MenusOpciones'
});

MenuOpcion.belongsTo(Menu,{
    as: 'menu',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

MenuOpcion.belongsTo(Opcion,{
    as: 'opcion',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


MenuOpcion.sync({
    alter: (process.env.ALTER === "TRUE"), 
    force: false
});
export default MenuOpcion;