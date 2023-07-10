//express
import express from "express";

//cors
import cors from "cors";

//enrutador
import citaRoutes from "./routes/citas.routes.js";
import pacienteRoutes from "./routes/pacientes.routes.js";
import adminRoutes from "./routes/administacion.routes.js";
import consultaRoutes from "./routes/consultasodon.routes.js";
import authRoutes from "./routes/auth.routes.js";

//conexion DB
import { poolDB } from "./database/db.js";

//variables de entorno
import { PORT, URL_PUBLIC } from "./config.js";

//
const app = express();
app.use(cors());
app.use(express.json());

//agregar rutas
app.use(citaRoutes);
app.use(pacienteRoutes);
app.use(adminRoutes);
app.use(consultaRoutes);
app.use(authRoutes);
//;

//verificar conexion con la BD antes de abrir el puerto del servidor
try {
  await poolDB.query("SET @@global.time_zone = '-05:00';");
  const [result] = await poolDB.query("SELECT current_timestamp();");
  console.log("hora actual --> " + new Date(Object.values(result[0])[0]));
  app.listen(PORT);
  console.log("conexion exitosa con BD");
  console.log(`Server is listening on port ${PORT}`);
  console.log(`URL Dental Smile App = ${URL_PUBLIC}`);
} catch (error) {
  console.log("Error en la conexion con la BD --> " + error);
  console.log("El servidor no esta en funcionamiento");
}
