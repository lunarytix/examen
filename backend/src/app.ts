import dotenv from "dotenv";
import Server from "./shared/server";

// Hacer uso de variables de entorno en el archivo .env
dotenv.config();
// Instanciar objeto Server y ejecutar servidor
const server:Server = new Server();
server.listen();