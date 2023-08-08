import { DataTypes, Model } from 'sequelize';
import db from '../../databases/config';
 const PROTECTED_ATTRIBUTES = ['visible','estado','createdAt','updatedAt']

class Modulo extends Model {
    toJSON = () => {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
} 

Modulo.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    },
    url:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull: true
    },
    visible:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize: db,
    timestamps: true,
    tableName: 'Modulos'
});
 

Modulo.sync({
    alter: (process.env.ALTER === "TRUE"),
    force: false
});
export default Modulo;