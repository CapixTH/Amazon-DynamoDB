import crypto from "crypto";
import Matricula from "../models/Matricula.js";
import Aluno from "../models/Aluno.js";
import Curso from "../models/Curso.js";
import SituacaoMatricula from "../enums/situacaoMatricula.js";
import validateDate from "../utils/validateDate.js";

function isValidSituacao(situacao) {
  return Object.values(SituacaoMatricula).includes(situacao);
}

export const createMatricula = async (req, res) => {
  try {
    const {
      alunoId,
      cursoId,
      numeroMatricula,
      dataMatricula,
      situacao,
      periodoAtual,
      dataPrevistaConclusao,
    } = req.body;

    if (
      !alunoId ||
      !cursoId ||
      !numeroMatricula ||
      !dataMatricula ||
      !situacao ||
      periodoAtual == null ||
      !dataPrevistaConclusao
    ) {
      return res.status(400).json({
        message:
          "Todos os campos obrigatórios da matrícula devem ser informados.",
      });
    }

    if (!isValidSituacao(situacao)) {
      return res.status(400).json({
        message: "Situação da matrícula inválida.",
      });
    }

    if (typeof periodoAtual !== "number" || periodoAtual < 1) {
      return res.status(400).json({
        message: "O período atual deve ser um número maior ou igual a 1.",
      });
    }

    if (!validateDate(dataMatricula)) {
      return res.status(400).json({
        message: "Data da matrícula inválida. Use o formato YYYY-MM-DD.",
      });
    }

    if (!validateDate(dataPrevistaConclusao)) {
      return res.status(400).json({
        message:
          "Data prevista de conclusão inválida. Use o formato YYYY-MM-DD.",
      });
    }

    const aluno = await Aluno.get(alunoId);

    if (!aluno) {
      return res.status(404).json({
        message: "Aluno não encontrado.",
      });
    }

    const curso = await Curso.get(cursoId);

    if (!curso) {
      return res.status(404).json({
        message: "Curso não encontrado.",
      });
    }

    const matriculaData = {
      id: crypto.randomUUID(),
      alunoId: alunoId.trim(),
      cursoId: cursoId.trim(),
      numeroMatricula: numeroMatricula.trim(),
      dataMatricula,
      situacao,
      periodoAtual,
      dataPrevistaConclusao,
    };

    const matricula = await Matricula.create(matriculaData);

    return res.status(201).json(matricula);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar matrícula.",
      error: error.message,
    });
  }
};

export const getAllMatriculas = async (req, res) => {
  try {
    const matriculas = await Matricula.scan().exec();

    return res.status(200).json(matriculas);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar matrículas.",
      error: error.message,
    });
  }
};

export const getMatriculaById = async (req, res) => {
  try {
    const { id } = req.params;

    const matricula = await Matricula.get(id);

    if (!matricula) {
      return res.status(404).json({
        message: "Matrícula não encontrada.",
      });
    }

    return res.status(200).json(matricula);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar matrícula.",
      error: error.message,
    });
  }
};
