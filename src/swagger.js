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
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

console.log(swaggerSpec.paths);

export default swaggerSpec;
