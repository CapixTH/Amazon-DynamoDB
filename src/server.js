import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import routes from "./routes/index.js";
import "./config/dynamodb.js";
import "./models/Aluno.js";
import "./models/Curso.js";
import "./models/Matricula.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
