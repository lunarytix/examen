import { DataTypes, Model } from 'sequelize';
import db from '../../databases/config';
import Empresa from './empresa';
import Menu from './menu';
import Opcion from './opcion';
import Usuario from './usuario';
const PROTECTED_ATTRIBUTES = ['estado','createdAt','updatedAt']

class UsuarioEmpresa extends Model {
    
    toJSON = () => {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
}
UsuarioEmpresa.init({
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
    tableName: 'UsuariosEmpresas'
});

UsuarioEmpresa.belongsTo(Usuario,{
    as: 'usuario',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

UsuarioEmpresa.belongsTo(Empresa,{
    as: 'empresa',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


UsuarioEmpresa.sync({
    alter: (process.env.ALTER === "TRUE"), 
    force: false
});
export default UsuarioEmpresa;