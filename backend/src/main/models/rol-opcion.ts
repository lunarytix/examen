import { DataTypes, Model } from 'sequelize';
import db from '../../databases/config';
import Menu from './menu';
import Opcion from './opcion';
import Rol from './rol';
const PROTECTED_ATTRIBUTES = ['estado','createdAt','updatedAt']


class RolOpcion extends Model {
    toJSON = () => {
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      return attributes
    }

}

RolOpcion.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estado:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
},{
    sequelize: db,
    timestamps: true,
    tableName: 'RolesOpciones'
});

RolOpcion.belongsTo(Rol,{
    as: 'rol',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

RolOpcion.belongsTo(Menu,{
    as: 'menu',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

RolOpcion.belongsTo(Opcion,{
    as: 'opcion',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


RolOpcion.sync({
    alter: true, //(process.env.ALTER === "TRUE"), 
    force: false
});

export default RolOpcion;