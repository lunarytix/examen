import db from "../../databases/config"
import { DataTypes , Model} from 'sequelize';
import Usuario from "./usuario";
import Navegador from "./navegador";

const PROTECTED_ATTRIBUTES = ['estado','createdAt','updatedAt']

class UsuarioNavegador extends Model {
    toJSON = () => {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
}

UsuarioNavegador.init({
    estado:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
},{
    sequelize: db,
    timestamps: true,
    tableName: 'UsuariosNavegadores'
})

UsuarioNavegador.belongsTo(Usuario,{
    as: 'usuario',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

UsuarioNavegador.belongsTo(Navegador,{
    as: 'navegador',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

UsuarioNavegador.sync({
    alter: (process.env.ALTER === "TRUE"),
    force: false
  });
  
  export default UsuarioNavegador;