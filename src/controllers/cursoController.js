import crypto from "crypto";
import Curso from "../models/Curso.js";
import ModalidadeCurso from "../enums/modalidadeCurso.js";
import TurnoCurso from "../enums/turnoCurso.js";
import StatusCurso from "../enums/statusCurso.js";

function isValidEnumValue(enumObject, value) {
  return Object.values(enumObject).includes(value);
}

function validateDisciplinas(disciplinas) {
  if (!Array.isArray(disciplinas) || disciplinas.length === 0) {
    return "O curso deve possuir ao menos uma disciplina.";
  }

  for (const disciplina of disciplinas) {
    const { codigo, nome, periodo, cargaHoraria, obrigatoria, preRequisitos } =
      disciplina;

    if (
      !codigo ||
      !nome ||
      periodo == null ||
      cargaHoraria == null ||
      obrigatoria == null
    ) {
      return "Todos os campos obrigatórios das disciplinas devem ser informados.";
    }

    if (typeof periodo !== "number" || periodo < 1) {
      return "O período da disciplina deve ser um número maior ou igual a 1.";
    }

    if (typeof cargaHoraria !== "number" || cargaHoraria <= 0) {
      return "A carga horária da disciplina deve ser maior que zero.";
    }

    if (typeof obrigatoria !== "boolean") {
      return "O campo obrigatoria da disciplina deve ser booleano.";
    }

    if (
      preRequisitos !== undefined &&
      (!Array.isArray(preRequisitos) ||
        !preRequisitos.every((item) => typeof item === "string"))
    ) {
      return "O campo preRequisitos deve ser uma lista de strings.";
    }
  }

  return null;
}

export const createCurso = async (req, res) => {
  try {
    const {
      nome,
      descricao,
      cargaHoraria,
      duracaoSemestres,
      modalidade,
      turno,
      areaConhecimento,
      coordenador,
      quantidadeVagas,
      status,
      disciplinas,
    } = req.body;

    if (
      !nome ||
      !descricao ||
      cargaHoraria == null ||
      duracaoSemestres == null ||
      !modalidade ||
      !turno ||
      !areaConhecimento ||
      !coordenador ||
      quantidadeVagas == null ||
      !status ||
      !disciplinas
    ) {
      return res.status(400).json({
        message: "Todos os campos obrigatórios do curso devem ser informados.",
      });
    }

    if (typeof cargaHoraria !== "number" || cargaHoraria <= 0) {
      return res.status(400).json({
        message: "A carga horária do curso deve ser maior que zero.",
      });
    }

    if (typeof duracaoSemestres !== "number" || duracaoSemestres <= 0) {
      return res.status(400).json({
        message: "A duração em semestres deve ser maior que zero.",
      });
    }

    if (typeof quantidadeVagas !== "number" || quantidadeVagas <= 0) {
      return res.status(400).json({
        message: "A quantidade de vagas deve ser maior que zero.",
      });
    }

    if (!isValidEnumValue(ModalidadeCurso, modalidade)) {
      return res.status(400).json({
        message: "Modalidade do curso inválida.",
      });
    }

    if (!isValidEnumValue(TurnoCurso, turno)) {
      return res.status(400).json({
        message: "Turno do curso inválido.",
      });
    }

    if (!isValidEnumValue(StatusCurso, status)) {
      return res.status(400).json({
        message: "Status do curso inválido.",
      });
    }

    const disciplinasError = validateDisciplinas(disciplinas);

    if (disciplinasError) {
      return res.status(400).json({
        message: disciplinasError,
      });
    }

    const cursoData = {
      id: crypto.randomUUID(),
      nome: nome.trim(),
      descricao: descricao.trim(),
      cargaHoraria,
      duracaoSemestres,
      modalidade,
      turno,
      areaConhecimento: areaConhecimento.trim(),
      coordenador: coordenador.trim(),
      quantidadeVagas,
      status,
      disciplinas: disciplinas.map((disciplina) => ({
        id: disciplina.id || crypto.randomUUID(),
        codigo: disciplina.codigo.trim(),
        nome: disciplina.nome.trim(),
        periodo: disciplina.periodo,
        cargaHoraria: disciplina.cargaHoraria,
        obrigatoria: disciplina.obrigatoria,
        preRequisitos: Array.isArray(disciplina.preRequisitos)
          ? disciplina.preRequisitos.map((item) => item.trim())
          : [],
      })),
    };

    const curso = await Curso.create(cursoData);

    return res.status(201).json(curso);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar curso.",
      error: error.message,
    });
  }
};

export const getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.scan().exec();

    return res.status(200).json(cursos);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar cursos.",
      error: error.message,
    });
  }
};

export const getCursoById = async (req, res) => {
  try {
    const { id } = req.params;

    const curso = await Curso.get(id);

    if (!curso) {
      return res.status(404).json({
        message: "Curso não encontrado.",
      });
    }

    return res.status(200).json(curso);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar curso.",
      error: error.message,
    });
  }
};
