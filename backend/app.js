// Importo todo lo de la libreria express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeesRoutes from "./src/routes/employees.js"
import evaluationsRoutes from "./src/routes/evaluations.js"
import registerEmployees from"./src/routes/registerEmployees.js"
import cookieParser from "cookie-parser";

// Creo una constante que es igual a la libreria
// que acabo de importar, y la ejecuto
const app = express();

// middleware para que acepte datos JSON
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes)
app.use("/api/evaluations", evaluationsRoutes)
app.use("/api/registerEmployees", registerEmployees)

// exporto esta constante para usar express en todos lados
export default app;
