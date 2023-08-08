import { DataTypes, Model } from 'sequelize';
import db from '../../databases/config';
const PROTECTED_ATTRIBUTES = ['imagen','estado','createdAt','updatedAt']

class Empresa extends Model{
    
    toJSON = () => {
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      return attributes
    }

}
Empresa.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    razonSocial:{
        type: DataTypes.STRING
    },
    nombreComercial:{
        type: DataTypes.STRING
    },
    correo:{
        type: DataTypes.STRING
    },
    direccion:{
        type: DataTypes.STRING
    },
    latitud:{
        type: DataTypes.STRING
    },
    longitud:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: true
    },
    estado:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    imagen:{
        type: DataTypes.BLOB,
        allowNull: true
    }    
},{
    sequelize: db,
    timestamps: true,
    tableName: 'Empresas'
});

Empresa.sync({
    alter: (process.env.ALTER === "TRUE"),
    force: false
});


export default Empresa;