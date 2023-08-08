import { DataTypes, Model } from 'sequelize';
import db from '../../databases/config';
const PROTECTED_ATTRIBUTES = ['estado','createdAt','updatedAt']

class Opcion extends Model {
    toJSON = () => {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
}

Opcion.init({
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
    estado:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
},{
    sequelize: db,
    timestamps: true,
    tableName: 'Opciones'
});


Opcion.sync({
    alter: (process.env.ALTER === "TRUE"), 
    force: false
});
export default Opcion;