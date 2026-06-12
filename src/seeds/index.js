import "dotenv/config";
import "../config/dynamodb.js";

import Aluno from "../models/Aluno.js";
import Curso from "../models/Curso.js";
import Matricula from "../models/Matricula.js";

import alunosSeed from "./alunos.seed.js";
import cursosSeed from "./cursos.seed.js";
import matriculasSeed from "./matriculas.seed.js";

async function seedAlunos() {
  for (const aluno of alunosSeed) {
    await Aluno.create(aluno);
  }
  console.log("Alunos inseridos com sucesso.");
}

async function seedCursos() {
  for (const curso of cursosSeed) {
    await Curso.create(curso);
  }
  console.log("Cursos inseridos com sucesso.");
}

async function seedMatriculas() {
  for (const matricula of matriculasSeed) {
    await Matricula.create(matricula);
  }
  console.log("Matrículas inseridas com sucesso.");
}

async function runSeed() {
  try {
    console.log("Iniciando população do banco...");

    await seedAlunos();
    await seedCursos();
    await seedMatriculas();

    console.log("Seed finalizado com sucesso.");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
  }
}

runSeed();