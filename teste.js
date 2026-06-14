import Aluno from "./src/models/Aluno.js";

const result = await Aluno.scan().exec();

console.log(result);