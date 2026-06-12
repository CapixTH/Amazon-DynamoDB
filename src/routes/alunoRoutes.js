import { Router } from "express";
import {
  createAluno,
  getAllAlunos,
  getAlunoById,
} from "../controllers/alunoController.js";

const router = Router();

/**
 * @swagger
 * /api/alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - cpf
 *               - dataNascimento
 *               - registroAcademico
 *               - status
 *               - endereco
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 example: 2002-08-15
 *               registroAcademico:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ATIVO, INATIVO, FORMADO, EVADIDO]
 *               endereco:
 *                 type: object
 *                 required:
 *                   - rua
 *                   - bairro
 *                   - cep
 *                   - numero
 *                 properties:
 *                   rua:
 *                     type: string
 *                   bairro:
 *                     type: string
 *                   cep:
 *                     type: string
 *                   numero:
 *                     type: string
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/alunos", createAluno);

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos
 */
router.get("/alunos", getAllAlunos);

/**
 * @swagger
 * /api/alunos/{id}:
 *   get:
 *     summary: Busca um aluno por ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *       404:
 *         description: Aluno não encontrado
 */
router.get("/alunos/:id", getAlunoById);

export default router;