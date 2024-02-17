import { DataTypes ,Model, NOW, Sequelize } from 'sequelize';
import db from '../../../databases/config';



const PROTECTED_ATTRIBUTES = ['estado','createdAt','updatedAt']

class Prospecto extends Model {
    toJSON = () => {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
}

Prospecto.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING(30),
    
  },
  apellidoP: {
    type: DataTypes.STRING(30),
    
  },

  apellidoM: {
    type: DataTypes.STRING(30),
    
  },
 
  calle:{
      type: DataTypes.STRING(100)
  },

  colonia:{
    type: DataTypes.STRING(100)
  },


  numero:{
      type: DataTypes.INTEGER,
      defaultValue: 1
  },

  codigoPostal:{
    type: DataTypes.STRING
  },

  telefono:{
    type: DataTypes.STRING
  },

  rfc:{
    type: DataTypes.STRING
  },

  autorizacion:{
    type: DataTypes.BOOLEAN
  },

  estado:{
    type: DataTypes.INTEGER,
    defaultValue: 1
  },

  fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    }
},{
    sequelize: db,
    timestamps: true,
    tableName: 'Prospectos'
});

// Encuesta.belongsTo(Mesa, {
//     as: 'mesa',
//     onDelete: 'NO ACTION',
//     onUpdate: 'NO ACTION',
//     //   foreignKey: 'puestoId',
// });

// Modelos/Tablas Mesas,Edad,Clasificacion
Prospecto.sync({
    alter: true ,//(process.env.ALTER === "TRUE"),
  force: false
});

export default Prospecto;