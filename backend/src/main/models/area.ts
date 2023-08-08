import db from "../../databases/config"
import { DataTypes , Model} from 'sequelize';

const PROTECTED_ATTRIBUTES = ['estado','createdAt','updatedAt']

class Area extends Model {
    toJSON = () => {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
}

Area.init({
  nombre:{
    type: DataTypes.STRING
  },
  descripcion:{
    type: DataTypes.STRING
  },
  estado:{
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
},{
    sequelize: db,
    timestamps: true,
    tableName: 'Areas'
});

Area.sync({
  alter: (process.env.ALTER === "TRUE"),
  force: false
});

export default Area;