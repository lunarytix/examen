import { DataTypes,Model } from 'sequelize';
import db from '../../databases/config';
import Empresa from './empresa';
import Rol from './rol';
const PROTECTED_ATTRIBUTES = ['password','estado','createdAt','updatedAt']

class Usuario extends Model {

    toJSON = () => {
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      attributes.nombreCompleto = `${attributes['nombre']} ${attributes['apellidoP']} ${attributes['apellidoM'] || ''}`;
      return attributes
    }

  }
  
  Usuario.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre:{
                type: DataTypes.STRING
            },
            apellidoP:{
                type: DataTypes.STRING
            },
            apellidoM:{
                type: DataTypes.STRING,
                allowNull: true
            },
            correo:{
                type: DataTypes.STRING,
                // unique: true
            },
            password:{
                type: DataTypes.STRING,
               
            },
            telefono:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            estado:{
                type: DataTypes.INTEGER,
                defaultValue: 1,
                
            },
            verificado:{
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                
            },
            avatar:{
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: '/public/avatar/default.jpeg'
            },
            tokenGoogle:{
                type: DataTypes.STRING(5000)
            }
  },{
    sequelize: db,    
    timestamps: true,
    tableName: 'Usuarios',
  })

Usuario.belongsTo(Empresa,{
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    as:'empresa'
});

Usuario.belongsTo(Rol,{
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    as:'rol'
});

Usuario.sync({
    alter: (process.env.ALTER === "TRUE"), 
    force: false
});

export default Usuario;