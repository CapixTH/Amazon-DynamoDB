import { Router } from "express";
import {
  createCurso,
  getAllCursos,
  getCursoById,
  updateCurso,
  deleteCurso,
} from "../controllers/cursoController.js";

const router = Router();

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - cargaHoraria
 *               - duracaoSemestres
 *               - modalidade
 *               - turno
 *               - areaConhecimento
 *               - coordenador
 *               - quantidadeVagas
 *               - status
 *               - disciplinas
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               cargaHoraria:
 *                 type: number
 *               duracaoSemestres:
 *                 type: number
 *               modalidade:
 *                 type: string
 *                 enum: [PRESENCIAL, EAD, HIBRIDO]
 *               turno:
 *                 type: string
 *                 enum: [MATUTINO, VESPERTINO, NOTURNO, INTEGRAL]
 *               areaConhecimento:
 *                 type: string
 *               coordenador:
 *                 type: string
 *               quantidadeVagas:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [ATIVO, INATIVO]
 *               disciplinas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - codigo
 *                     - nome
 *                     - periodo
 *                     - cargaHoraria
 *                     - obrigatoria
 *                   properties:
 *                     id:
 *                       type: string
 *                     codigo:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     periodo:
 *                       type: number
 *                     cargaHoraria:
 *                       type: number
 *                     obrigatoria:
 *                       type: boolean
 *                     preRequisitos:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/cursos", createCurso);

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get("/cursos", getAllCursos);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Busca um curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso encontrado
 *       404:
 *         description: Curso não encontrado
 */
router.get("/cursos/:id", getCursoById);

/**
 * @swagger
 * /api/cursos/{id}:
 *   put:
 *     summary: Atualiza um curso
 *     tags: [Cursos]
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
 *               - descricao
 *               - cargaHoraria
 *               - duracaoSemestres
 *               - modalidade
 *               - turno
 *               - areaConhecimento
 *               - coordenador
 *               - quantidadeVagas
 *               - status
 *               - disciplinas
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               cargaHoraria:
 *                 type: number
 *               duracaoSemestres:
 *                 type: number
 *               modalidade:
 *                 type: string
 *                 enum: [PRESENCIAL, EAD, HIBRIDO]
 *               turno:
 *                 type: string
 *                 enum: [MATUTINO, VESPERTINO, NOTURNO, INTEGRAL]
 *               areaConhecimento:
 *                 type: string
 *               coordenador:
 *                 type: string
 *               quantidadeVagas:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [ATIVO, INATIVO]
 *               disciplinas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - codigo
 *                     - nome
 *                     - periodo
 *                     - cargaHoraria
 *                     - obrigatoria
 *                   properties:
 *                     id:
 *                       type: string
 *                     codigo:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     periodo:
 *                       type: number
 *                     cargaHoraria:
 *                       type: number
 *                     obrigatoria:
 *                       type: boolean
 *                     preRequisitos:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Curso não encontrado
 */
router.put("/cursos/:id", updateCurso);

/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     summary: Remove um curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso removido com sucesso
 *       404:
 *         description: Curso não encontrado
 */
router.delete("/cursos/:id", deleteCurso);

export default router;
