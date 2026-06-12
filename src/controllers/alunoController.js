import crypto from "crypto";
import Aluno from "../models/Aluno.js";
import StatusAluno from "../enums/statusAluno.js";
import normalizeCpf from "../utils/normalizeCpf.js";
import normalizeCep from "../utils/normalizeCep.js";
import validateCpf from "../utils/validateCpf.js";
import validateDate from "../utils/validateDate.js";
import validateEmail from "../utils/validateEmail.js";

function isValidStatus(status) {
  return Object.values(StatusAluno).includes(status);
}

function isFutureDate(dateString) {
  const today = new Date();
  const inputDate = new Date(`${dateString}T00:00:00`);

  today.setHours(0, 0, 0, 0);

  return inputDate > today;
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

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "E-mail inválido.",
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

    if (isFutureDate(dataNascimento)) {
      return res.status(400).json({
        message: "A data de nascimento não pode ser futura.",
      });
    }

    const normalizedCpf = normalizeCpf(cpf);
    const normalizedRegistroAcademico = registroAcademico.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const existingAlunoByCpf = await Aluno.scan("cpf").eq(normalizedCpf).exec();

    if (existingAlunoByCpf.count > 0) {
      return res.status(409).json({
        message: "Já existe um aluno cadastrado com este CPF.",
      });
    }

    const existingAlunoByRegistro = await Aluno.scan("registroAcademico")
      .eq(normalizedRegistroAcademico)
      .exec();

    if (existingAlunoByRegistro.count > 0) {
      return res.status(409).json({
        message: "Já existe um aluno cadastrado com este registro acadêmico.",
      });
    }

    const alunoData = {
      id: crypto.randomUUID(),
      nome: nome.trim(),
      email: normalizedEmail,
      cpf: normalizedCpf,
      dataNascimento,
      registroAcademico: normalizedRegistroAcademico,
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

export const updateAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome,
      email,
      cpf,
      dataNascimento,
      registroAcademico,
      status,
      endereco,
    } = req.body;

    const alunoExistente = await Aluno.get(id);

    if (!alunoExistente) {
      return res.status(404).json({
        message: "Aluno não encontrado.",
      });
    }

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

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "E-mail inválido.",
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

    if (isFutureDate(dataNascimento)) {
      return res.status(400).json({
        message: "A data de nascimento não pode ser futura.",
      });
    }

    const normalizedCpf = normalizeCpf(cpf);
    const normalizedRegistroAcademico = registroAcademico.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const existingAlunoByCpf = await Aluno.scan("cpf").eq(normalizedCpf).exec();
    const cpfDuplicado = existingAlunoByCpf.find((aluno) => aluno.id !== id);

    if (cpfDuplicado) {
      return res.status(409).json({
        message: "Já existe um aluno cadastrado com este CPF.",
      });
    }

    const existingAlunoByRegistro = await Aluno.scan("registroAcademico")
      .eq(normalizedRegistroAcademico)
      .exec();

    const registroDuplicado = existingAlunoByRegistro.find(
      (aluno) => aluno.id !== id,
    );

    if (registroDuplicado) {
      return res.status(409).json({
        message: "Já existe um aluno cadastrado com este registro acadêmico.",
      });
    }

    const alunoAtualizado = await Aluno.update({
      id,
      nome: nome.trim(),
      email: normalizedEmail,
      cpf: normalizedCpf,
      dataNascimento,
      registroAcademico: normalizedRegistroAcademico,
      status,
      endereco: {
        rua: rua.trim(),
        bairro: bairro.trim(),
        cep: normalizeCep(cep),
        numero: String(numero).trim(),
      },
    });

    return res.status(200).json(alunoAtualizado);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar aluno.",
      error: error.message,
    });
  }
};

export const deleteAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const alunoExistente = await Aluno.get(id);

    if (!alunoExistente) {
      return res.status(404).json({
        message: "Aluno não encontrado.",
      });
    }

    await Aluno.delete(id);

    return res.status(200).json({
      message: "Aluno removido com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao remover aluno.",
      error: error.message,
    });
  }
};
