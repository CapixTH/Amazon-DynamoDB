import crypto from "crypto";
import Matricula from "../models/Matricula.js";
import Aluno from "../models/Aluno.js";
import Curso from "../models/Curso.js";
import SituacaoMatricula from "../enums/situacaoMatricula.js";
import validateDate from "../utils/validateDate.js";

function isValidSituacao(situacao) {
  return Object.values(SituacaoMatricula).includes(situacao);
}

function isAfterDate(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  return end > start;
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

    if (!isAfterDate(dataMatricula, dataPrevistaConclusao)) {
      return res.status(400).json({
        message:
          "A data prevista de conclusão deve ser posterior à data da matrícula.",
      });
    }

    const normalizedAlunoId = alunoId.trim();
    const normalizedCursoId = cursoId.trim();
    const normalizedNumeroMatricula = numeroMatricula.trim().toUpperCase();

    const existingMatriculaByNumero = await Matricula.scan("numeroMatricula")
      .eq(normalizedNumeroMatricula)
      .exec();

    if (existingMatriculaByNumero.count > 0) {
      return res.status(409).json({
        message: "Já existe uma matrícula cadastrada com este número.",
      });
    }

    const aluno = await Aluno.get(normalizedAlunoId);

    if (!aluno) {
      return res.status(404).json({
        message: "Aluno não encontrado.",
      });
    }

    const curso = await Curso.get(normalizedCursoId);

    if (!curso) {
      return res.status(404).json({
        message: "Curso não encontrado.",
      });
    }

    if (periodoAtual > curso.duracaoSemestres) {
      return res.status(400).json({
        message:
          "O período atual não pode ser maior que a duração do curso em semestres.",
      });
    }

    const existingActiveMatricula = await Matricula.scan("alunoId")
      .eq(normalizedAlunoId)
      .where("cursoId")
      .eq(normalizedCursoId)
      .where("situacao")
      .eq("ATIVA")
      .exec();

    if (situacao === "ATIVA" && existingActiveMatricula.count > 0) {
      return res.status(409).json({
        message: "O aluno já possui uma matrícula ativa para este curso.",
      });
    }

    const matriculaData = {
      id: crypto.randomUUID(),
      alunoId: normalizedAlunoId,
      cursoId: normalizedCursoId,
      numeroMatricula: normalizedNumeroMatricula,
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
    const { alunoId, cursoId, situacao, numeroMatricula } = req.query;

    let matriculas = await Matricula.scan().exec();

    if (situacao) {
      if (!isValidSituacao(situacao)) {
        return res.status(400).json({
          message: "Situação da matrícula inválida.",
        });
      }

      matriculas = matriculas.filter(
        (matricula) => matricula.situacao === situacao,
      );
    }

    if (alunoId) {
      const normalizedAlunoId = alunoId.trim();

      matriculas = matriculas.filter(
        (matricula) => matricula.alunoId === normalizedAlunoId,
      );
    }

    if (cursoId) {
      const normalizedCursoId = cursoId.trim();

      matriculas = matriculas.filter(
        (matricula) => matricula.cursoId === normalizedCursoId,
      );
    }

    if (numeroMatricula) {
      const normalizedNumeroMatricula = numeroMatricula.trim().toUpperCase();

      matriculas = matriculas.filter(
        (matricula) => matricula.numeroMatricula === normalizedNumeroMatricula,
      );
    }

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

export const updateMatricula = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      alunoId,
      cursoId,
      numeroMatricula,
      dataMatricula,
      situacao,
      periodoAtual,
      dataPrevistaConclusao,
    } = req.body;

    const matriculaExistente = await Matricula.get(id);

    if (!matriculaExistente) {
      return res.status(404).json({
        message: "Matrícula não encontrada.",
      });
    }

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

    if (!isAfterDate(dataMatricula, dataPrevistaConclusao)) {
      return res.status(400).json({
        message:
          "A data prevista de conclusão deve ser posterior à data da matrícula.",
      });
    }

    const normalizedAlunoId = alunoId.trim();
    const normalizedCursoId = cursoId.trim();
    const normalizedNumeroMatricula = numeroMatricula.trim().toUpperCase();

    const existingMatriculaByNumero = await Matricula.scan("numeroMatricula")
      .eq(normalizedNumeroMatricula)
      .exec();

    const numeroDuplicado = existingMatriculaByNumero.find(
      (matricula) => matricula.id !== id,
    );

    if (numeroDuplicado) {
      return res.status(409).json({
        message: "Já existe uma matrícula cadastrada com este número.",
      });
    }

    const aluno = await Aluno.get(normalizedAlunoId);

    if (!aluno) {
      return res.status(404).json({
        message: "Aluno não encontrado.",
      });
    }

    const curso = await Curso.get(normalizedCursoId);

    if (!curso) {
      return res.status(404).json({
        message: "Curso não encontrado.",
      });
    }

    if (periodoAtual > curso.duracaoSemestres) {
      return res.status(400).json({
        message:
          "O período atual não pode ser maior que a duração do curso em semestres.",
      });
    }

    const existingActiveMatricula = await Matricula.scan("alunoId")
      .eq(normalizedAlunoId)
      .where("cursoId")
      .eq(normalizedCursoId)
      .where("situacao")
      .eq("ATIVA")
      .exec();

    const activeDuplicada = existingActiveMatricula.find(
      (matricula) => matricula.id !== id,
    );

    if (situacao === "ATIVA" && activeDuplicada) {
      return res.status(409).json({
        message: "O aluno já possui uma matrícula ativa para este curso.",
      });
    }

    const matriculaAtualizada = await Matricula.update({
      id,
      alunoId: normalizedAlunoId,
      cursoId: normalizedCursoId,
      numeroMatricula: normalizedNumeroMatricula,
      dataMatricula,
      situacao,
      periodoAtual,
      dataPrevistaConclusao,
    });

    return res.status(200).json(matriculaAtualizada);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar matrícula.",
      error: error.message,
    });
  }
};

export const deleteMatricula = async (req, res) => {
  try {
    const { id } = req.params;

    const matriculaExistente = await Matricula.get(id);

    if (!matriculaExistente) {
      return res.status(404).json({
        message: "Matrícula não encontrada.",
      });
    }

    await Matricula.delete(id);

    return res.status(200).json({
      message: "Matrícula removida com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao remover matrícula.",
      error: error.message,
    });
  }
};
