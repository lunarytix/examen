import { DataTypes, Model } from 'sequelize';
import db from '../../databases/config';
import Modulo from './modulo';
const PROTECTED_ATTRIBUTES = ['estado','createdAt','updatedAt']

class Menu extends Model{
    toJSON = () => {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
}



Menu.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING
    },
    icon:{
        type: DataTypes.STRING
    },
    route:{
        type: DataTypes.STRING
    },
    padreId:{
        type: DataTypes.INTEGER
    },
    estado:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
},{
    sequelize: db,
    timestamps: true,
    tableName: 'Menus'
});

Menu.belongsTo(Modulo,{
    as: 'modulo',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Menu.sync({
    alter: (process.env.ALTER === "TRUE"),
    force: false

});
export default Menu;