import db from "../../databases/config"
import { DataTypes,Model } from 'sequelize';

const PROTECTED_ATTRIBUTES = ['estado','createdAt','updatedAt']

class Navegador extends Model {
    toJSON = () => {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
}

Navegador.init({
  endpoint:{
    type: DataTypes.STRING
  },
  auth:{
    type: DataTypes.STRING
  },
  sha:{
    type: DataTypes.STRING
  },
  estado:{
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
},{
    sequelize: db,
    timestamps: true,
    tableName: 'Navegadores'
});

Navegador.sync({
  alter: (process.env.ALTER === "TRUE"),
  force: false
});

export default Navegador;