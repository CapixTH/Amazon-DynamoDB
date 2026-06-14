import { Router } from "express";
import {
  getMatriculasAtivas,
  getAlunosAtivosResumo,
  getMatriculasDetalhadas,
  getDisciplinasPorPeriodo,
  getCursosPorDisciplina,
  getAlunosPorEndereco,
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

/**
 * @swagger
 * /api/consultas/cursos-por-disciplina:
 *   get:
 *     summary: Consulta por Array de disciplinas na tabela de cursos
 *     tags: [Consultas]
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: false
 *         schema:
 *           type: string
 *         description: Nome parcial da disciplina
 *       - in: query
 *         name: codigo
 *         required: false
 *         schema:
 *           type: string
 *         description: Código exato da disciplina
 *     responses:
 *       200:
 *         description: Conuslta realizada com sucesso
 *       400:
 *         description: É necessário informar nome ou codigo
 */
router.get("/consultas/cursos-por-disciplina", getCursosPorDisciplina);

/**
 * @swagger
 * /api/consultas/alunos-por-endereco:
 *   get:
 *     summary: Consulta por subdocumento de endereço na tabela de alunos
 *     tags: [Consultas]
 *     parameters:
 *       - in: query
 *         name: rua
 *         required: false
 *         schema:
 *           type: string
 *         description: Nome parcial da rua
 *       - in: query
 *         name: bairro
 *         required: false
 *         schema:
 *           type: string
 *         description: Nome parcial do bairro
 *       - in: query
 *         name: cep
 *         required: false
 *         schema:
 *           type: string
 *         description: CEP exato do endereço
 *       - in: query
 *         name: numero
 *         required: false
 *         schema:
 *           type: string
 *         description: Número exato do endereço
 *     responses:
 *       200:
 *         description: Lista de alunos encontrados pelo endereço informado
 *       400:
 *         description: É necessário informar ao menos um campo de endereço
 */
router.get("/consultas/alunos-por-endereco", getAlunosPorEndereco);

export default router;
