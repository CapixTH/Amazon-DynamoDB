import { Router } from "express";
import {
  createMatricula,
  getAllMatriculas,
  getMatriculaById,
  updateMatricula,
  deleteMatricula,
} from "../controllers/matriculaController.js";

const router = Router();

/**
 * @swagger
 * /api/matriculas:
 *   post:
 *     summary: Cria uma nova matrícula
 *     tags: [Matriculas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alunoId
 *               - cursoId
 *               - numeroMatricula
 *               - dataMatricula
 *               - situacao
 *               - periodoAtual
 *               - dataPrevistaConclusao
 *             properties:
 *               alunoId:
 *                 type: string
 *               cursoId:
 *                 type: string
 *               numeroMatricula:
 *                 type: string
 *               dataMatricula:
 *                 type: string
 *                 example: 2026-02-01
 *               situacao:
 *                 type: string
 *                 enum: [ATIVA, TRANCADA, CANCELADA, CONCLUIDA]
 *               periodoAtual:
 *                 type: number
 *               dataPrevistaConclusao:
 *                 type: string
 *                 example: 2029-12-01
 *     responses:
 *       201:
 *         description: Matrícula criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Aluno ou curso não encontrado
 *       409:
 *         description: Número de matrícula duplicado ou matrícula ativa já existente
 */
router.post("/matriculas", createMatricula);

/**
 * @swagger
 * /api/matriculas:
 *   get:
 *     summary: Lista todas as matrículas
 *     tags: [Matriculas]
 *     responses:
 *       200:
 *         description: Lista de matrículas
 */
router.get("/matriculas", getAllMatriculas);

/**
 * @swagger
 * /api/matriculas/{id}:
 *   get:
 *     summary: Busca uma matrícula por ID
 *     tags: [Matriculas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matrícula encontrada
 *       404:
 *         description: Matrícula não encontrada
 */
router.get("/matriculas/:id", getMatriculaById);

/**
 * @swagger
 * /api/matriculas/{id}:
 *   put:
 *     summary: Atualiza uma matrícula
 *     tags: [Matriculas]
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
 *               - alunoId
 *               - cursoId
 *               - numeroMatricula
 *               - dataMatricula
 *               - situacao
 *               - periodoAtual
 *               - dataPrevistaConclusao
 *             properties:
 *               alunoId:
 *                 type: string
 *               cursoId:
 *                 type: string
 *               numeroMatricula:
 *                 type: string
 *               dataMatricula:
 *                 type: string
 *                 example: 2026-02-01
 *               situacao:
 *                 type: string
 *                 enum: [ATIVA, TRANCADA, CANCELADA, CONCLUIDA]
 *               periodoAtual:
 *                 type: number
 *               dataPrevistaConclusao:
 *                 type: string
 *                 example: 2029-12-01
 *     responses:
 *       200:
 *         description: Matrícula atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Matrícula, aluno ou curso não encontrado
 *       409:
 *         description: Número de matrícula duplicado ou matrícula ativa já existente
 */
router.put("/matriculas/:id", updateMatricula);

/**
 * @swagger
 * /api/matriculas/{id}:
 *   delete:
 *     summary: Remove uma matrícula
 *     tags: [Matriculas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matrícula removida com sucesso
 *       404:
 *         description: Matrícula não encontrada
 */
router.delete("/matriculas/:id", deleteMatricula);

export default router;
