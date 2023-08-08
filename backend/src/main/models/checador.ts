import db from "../../databases/config"
import { DataTypes,Model} from 'sequelize';
import Area from "./area";

const PROTECTED_ATTRIBUTES = ['estado','createdAt','updatedAt']

class Checador extends Model {
    toJSON = () => {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
}


Checador.init({
    checadorId:{
      type: DataTypes.STRING
    },
    estado:{
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    esJefe:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{
      sequelize: db,
      timestamps: true,
      tableName: 'Checadores'
  });
  
  Checador.belongsTo(Area,{
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    as:'area'
  });

  Checador.sync({
    alter: (process.env.ALTER === "TRUE"),
    force: false
  });

export default Checador;