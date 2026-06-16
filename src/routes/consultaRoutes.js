import { Router } from "express";
import {
  getMatriculasAtivas,
  getAlunosAtivosResumoScan,
  getAlunosAtivosResumo,
  compararAlunosAtivosResumo,
  getMatriculasDetalhadas,
  getDisciplinasPorPeriodo,
  getCursosPorDisciplina,
  getAlunosPorEndereco,
  getMatriculasAgrupadasPorSituacao,
  getDisciplinasDetalhadas,
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
 * /api/consultas/alunos-ativos-resumo-scan:
 *   get:
 *     summary: Versão antiga da consulta de alunos ativos usando scan
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Resumo de alunos ativos usando scan
 */
router.get("/consultas/alunos-ativos-resumo-scan", getAlunosAtivosResumoScan);

/**
 * @swagger
 * /api/consultas/alunos-ativos-resumo:
 *   get:
 *     summary: Versão otimizada da consulta de alunos ativos usando query com GSI
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Resumo de alunos ativos
 */
router.get("/consultas/alunos-ativos-resumo", getAlunosAtivosResumo);

/**
 * @swagger
 * /api/consultas/alunos-ativos-resumo-comparativo:
 *   get:
 *     summary: Compara scan e query com índice na consulta de alunos ativos
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Comparativo entre consulta antiga e consulta otimizada
 */
router.get(
  "/consultas/alunos-ativos-resumo-comparativo",
  compararAlunosAtivosResumo,
);

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

/**
 * @swagger
 * /api/consultas/matriculas-agrupadas-por-situacao:
 *   get:
 *     summary: Consulta complexa de matrículas agrupadas por situação
 *     tags: [Consultas]
 *     parameters:
 *       - in: query
 *         name: situacao
 *         required: false
 *         schema:
 *           type: string
 *           enum: [ATIVA, TRANCADA, CANCELADA, CONCLUIDA]
 *         description: Filtra matrículas por situação
 *     responses:
 *       200:
 *         description: Matrículas agrupadas por situação
 */
router.get(
  "/consultas/matriculas-agrupadas-por-situacao",
  getMatriculasAgrupadasPorSituacao,
);

/**
 * @swagger
 * /api/consultas/disciplinas-detalhadas:
 *   get:
 *     summary: Consulta complexa de disciplinas detalhadas com alunos matriculados
 *     tags: [Consultas]
 *     parameters:
 *       - in: query
 *         name: nomeDisciplina
 *         required: false
 *         schema:
 *           type: string
 *         description: Nome parcial da disciplina
 *       - in: query
 *         name: periodo
 *         required: false
 *         schema:
 *           type: number
 *         description: Período da disciplina
 *     responses:
 *       200:
 *         description: Disciplinas detalhadas agrupadas por período
 */
router.get("/consultas/disciplinas-detalhadas", getDisciplinasDetalhadas);

export default router;
