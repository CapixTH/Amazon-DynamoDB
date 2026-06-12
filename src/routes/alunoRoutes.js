import { Router } from "express";
import {
  createAluno,
  getAllAlunos,
  getAlunoById,
  updateAluno,
  deleteAluno,
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
 *       409:
 *         description: CPF ou registro acadêmico já cadastrado
 */
router.post("/alunos", createAluno);

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Lista todos os alunos com filtros opcionais
 *     tags: [Alunos]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [ATIVO, INATIVO, FORMADO, EVADIDO]
 *         description: Filtra alunos por status
 *       - in: query
 *         name: nome
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra alunos por nome parcial
 *       - in: query
 *         name: email
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra alunos por e-mail parcial
 *       - in: query
 *         name: registroAcademico
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra alunos por registro acadêmico exato
 *     responses:
 *       200:
 *         description: Lista de alunos
 *       400:
 *         description: Filtro inválido
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

/**
 * @swagger
 * /api/alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       200:
 *         description: Aluno atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Aluno não encontrado
 *       409:
 *         description: CPF ou registro acadêmico já cadastrado
 */
router.put("/alunos/:id", updateAluno);

/**
 * @swagger
 * /api/alunos/{id}:
 *   delete:
 *     summary: Remove um aluno
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aluno removido com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.delete("/alunos/:id", deleteAluno);

export default router;
