import { Router } from "express";
import {
  getMatriculasAtivas,
  getAlunosAtivosResumo,
  getMatriculasDetalhadas,
  getDisciplinasPorPeriodo,
} from "../controllers/consultaController.js";

const router = Router();

/**
 * @swagger
 * /api/consultas/matriculas-ativas:
 *   get:
 *     summary: Consulta equivalente ao find do MongoDB
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de matrículas ativas
 */
router.get("/consultas/matriculas-ativas", getMatriculasAtivas);

/**
 * @swagger
 * /api/consultas/alunos-ativos-resumo:
 *   get:
 *     summary: Consulta equivalente ao aggregate com $match e $project do MongoDB
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Resumo de alunos ativos
 */
router.get("/consultas/alunos-ativos-resumo", getAlunosAtivosResumo);

/**
 * @swagger
 * /api/consultas/matriculas-detalhadas:
 *   get:
 *     summary: Consulta equivalente ao $lookup do MongoDB
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de matrículas com dados de aluno e curso
 */
router.get("/consultas/matriculas-detalhadas", getMatriculasDetalhadas);

/**
 * @swagger
 * /api/consultas/disciplinas-por-periodo:
 *   get:
 *     summary: Consulta equivalente ao $unwind e $group do MongoDB
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Disciplinas agrupadas por período
 */
router.get("/consultas/disciplinas-por-periodo", getDisciplinasPorPeriodo);

export default router;