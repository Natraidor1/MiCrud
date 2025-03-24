// importo el archivo app.js
import app from "./app.js";
//importo el archivo de conexion de la base de datos
import "./database.js";
// importo el archivo config
import { config } from "./src/config.js";

// Creo una función que ejecuta el servidor
async function main() {
  app.listen(config.server.port);
  console.log("Server running is " + config.server.port);
}

// Ejecuto la función
main();
