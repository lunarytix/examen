import { Dialect, Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const params = {
    name:     process.env.DATABASE_NAME || '',
    user:     process.env.DATABASE_USER || '',
    passwd:   process.env.DATABASE_PASSWD || '',
    host:     process.env.DATABASE_HOST || '',
    dialect:  process.env.DATABASE_DIALECT || ''
}



  const db = new Sequelize(
        params.name,
        params.user,
        params.passwd,
        {
          host: params.host,
          dialect:params.dialect as Dialect, 
          timezone: '-07:00'
        });




export default db;