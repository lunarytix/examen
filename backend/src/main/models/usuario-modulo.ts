import { DataTypes } from 'sequelize';
import db from '../../databases/config';
import Modulo from './modulo';
import Usuario from './usuario';

const UsuarioModulo = db.define('UsuarioModulo',{
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
    timestamps: true,
    tableName: 'UsuariosModulos'
});

UsuarioModulo.belongsTo(Usuario,{
    as: 'usuario',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

UsuarioModulo.belongsTo(Modulo,{
    as: 'modulo',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});


UsuarioModulo.sync({
    alter: (process.env.ALTER === "TRUE"), 
    force: false
});
export default UsuarioModulo;