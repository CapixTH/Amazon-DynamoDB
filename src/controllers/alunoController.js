import crypto from "crypto";
import Aluno from "../models/Aluno.js";
import StatusAluno from "../enums/statusAluno.js";
import normalizeCpf from "../utils/normalizeCpf.js";
import normalizeCep from "../utils/normalizeCep.js";
import validateCpf from "../utils/validateCpf.js";
import validateDate from "../utils/validateDate.js";

function isValidStatus(status) {
  return Object.values(StatusAluno).includes(status);
}

export const createAluno = async (req, res) => {
  try {
    const {
      nome,
      email,
      cpf,
      dataNascimento,
      registroAcademico,
      status,
      endereco,
    } = req.body;

    if (
      !nome ||
      !email ||
      !cpf ||
      !dataNascimento ||
      !registroAcademico ||
      !status ||
      !endereco
    ) {
      return res.status(400).json({
        message: "Todos os campos obrigatórios devem ser informados.",
      });
    }

    const { rua, bairro, cep, numero } = endereco;

    if (!rua || !bairro || !cep || !numero) {
      return res.status(400).json({
        message: "Todos os campos do endereço devem ser informados.",
      });
    }

    if (!isValidStatus(status)) {
      return res.status(400).json({
        message: "Status do aluno inválido.",
      });
    }

    if (!validateCpf(cpf)) {
      return res.status(400).json({
        message: "CPF inválido.",
      });
    }

    if (!validateDate(dataNascimento)) {
      return res.status(400).json({
        message: "Data de nascimento inválida. Use o formato YYYY-MM-DD.",
      });
    }

    const alunoData = {
      id: crypto.randomUUID(),
      nome: nome.trim(),
      email: email.trim(),
      cpf: normalizeCpf(cpf),
      dataNascimento,
      registroAcademico: registroAcademico.trim(),
      status,
      endereco: {
        rua: rua.trim(),
        bairro: bairro.trim(),
        cep: normalizeCep(cep),
        numero: String(numero).trim(),
      },
    };

    const aluno = await Aluno.create(alunoData);

    return res.status(201).json(aluno);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar aluno.",
      error: error.message,
    });
  }
};

export const getAllAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.scan().exec();

    return res.status(200).json(alunos);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar alunos.",
      error: error.message,
    });
  }
};

export const getAlunoById = async (req, res) => {
  try {
    const { id } = req.params;

    const aluno = await Aluno.get(id);

    if (!aluno) {
      return res.status(404).json({
        message: "Aluno não encontrado.",
      });
    }

    return res.status(200).json(aluno);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar aluno.",
      error: error.message,
    });
  }
};
