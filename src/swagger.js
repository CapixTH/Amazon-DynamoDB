import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Amazon DynamoDB API",
    version: "1.0.0",
    description: "Documentação da API com Swagger",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  tags: [
    {
      name: "Health Check",
    },
    {
      name: "Alunos",
      description: "Operações relacionadas aos alunos",
    },
    {
      name: "Cursos",
      description: "Operações relacionadas aos cursos",
    },
    {
      name: "Matriculas",
      description: "Operações relacionadas às matrículas",
    },
    {
      name: "Consultas",
      description: "Consultas demonstrativas e complexas",
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;