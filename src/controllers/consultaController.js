import Aluno from "../models/Aluno.js";
import Curso from "../models/Curso.js";
import Matricula from "../models/Matricula.js";

export const getMatriculasAtivas = async (req, res) => {
  try {
    const matriculas = await Matricula.scan("situacao").eq("ATIVA").exec();

    return res.status(200).json({
      descricao:
        "Equivalente ao find do MongoDB para buscar matrículas ativas.",
      total: matriculas.length,
      dados: matriculas,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao consultar matrículas ativas.",
      error: error.message,
    });
  }
};

export const getAlunosAtivosResumo = async (req, res) => {
  try {
    const alunos = await Aluno.scan("status").eq("ATIVO").exec();

    const resultado = alunos.map((aluno) => ({
      nome: aluno.nome,
      email: aluno.email,
      registroAcademico: aluno.registroAcademico,
      status: aluno.status,
      endereco: aluno.endereco,
    }));

    return res.status(200).json({
      descricao:
        "Equivalente ao aggregate com $match e $project do MongoDB para listar apenas alguns campos dos alunos ativos.",
      total: resultado.length,
      dados: resultado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao consultar resumo de alunos ativos.",
      error: error.message,
    });
  }
};

export const getMatriculasDetalhadas = async (req, res) => {
  try {
    const matriculas = await Matricula.scan().exec();

    const resultado = await Promise.all(
      matriculas.map(async (matricula) => {
        const aluno = await Aluno.get(matricula.alunoId);
        const curso = await Curso.get(matricula.cursoId);

        return {
          id: matricula.id,
          numeroMatricula: matricula.numeroMatricula,
          dataMatricula: matricula.dataMatricula,
          situacao: matricula.situacao,
          periodoAtual: matricula.periodoAtual,
          dataPrevistaConclusao: matricula.dataPrevistaConclusao,
          aluno: aluno
            ? {
                id: aluno.id,
                nome: aluno.nome,
                email: aluno.email,
                registroAcademico: aluno.registroAcademico,
                status: aluno.status,
              }
            : null,
          curso: curso
            ? {
                id: curso.id,
                nome: curso.nome,
                modalidade: curso.modalidade,
                turno: curso.turno,
                status: curso.status,
              }
            : null,
        };
      }),
    );

    return res.status(200).json({
      descricao:
        "Equivalente ao $lookup do MongoDB, juntando dados de matrícula com aluno e curso no nível da aplicação.",
      total: resultado.length,
      dados: resultado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao consultar matrículas detalhadas.",
      error: error.message,
    });
  }
};

export const getDisciplinasPorPeriodo = async (req, res) => {
  try {
    const cursos = await Curso.scan().exec();

    const disciplinasExpandida = cursos.flatMap((curso) =>
      (curso.disciplinas || []).map((disciplina) => ({
        cursoId: curso.id,
        cursoNome: curso.nome,
        cursoStatus: curso.status,
        disciplinaId: disciplina.id,
        codigo: disciplina.codigo,
        nome: disciplina.nome,
        periodo: disciplina.periodo,
        cargaHoraria: disciplina.cargaHoraria,
        obrigatoria: disciplina.obrigatoria,
        preRequisitos: disciplina.preRequisitos || [],
      })),
    );

    const agrupado = Object.values(
      disciplinasExpandida.reduce((acc, disciplina) => {
        const chave = disciplina.periodo;

        if (!acc[chave]) {
          acc[chave] = {
            periodo: disciplina.periodo,
            totalDisciplinas: 0,
            disciplinas: [],
          };
        }

        acc[chave].totalDisciplinas += 1;
        acc[chave].disciplinas.push({
          disciplinaId: disciplina.disciplinaId,
          codigo: disciplina.codigo,
          nome: disciplina.nome,
          cursoId: disciplina.cursoId,
          cursoNome: disciplina.cursoNome,
          cargaHoraria: disciplina.cargaHoraria,
          obrigatoria: disciplina.obrigatoria,
          preRequisitos: disciplina.preRequisitos,
        });

        return acc;
      }, {}),
    ).sort((a, b) => a.periodo - b.periodo);

    return res.status(200).json({
      descricao:
        "Equivalente ao uso de $unwind e $group no MongoDB, expandindo o array de disciplinas e agrupando por período.",
      totalPeriodos: agrupado.length,
      totalDisciplinas: disciplinasExpandida.length,
      dados: agrupado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao consultar disciplinas por período.",
      error: error.message,
    });
  }
};

export const getCursosPorDisciplina = async (req, res) => {
  try {
    const { nome, codigo } = req.query;

    if (!nome && !codigo) {
      return res.status(400).json({
        message: "Informe ao menos um parâmetro de busca: nome ou codigo.",
      });
    }

    const nomeNormalizado = nome ? nome.trim().toLowerCase() : null;
    const codigoNormalizado = codigo ? codigo.trim().toUpperCase() : null;

    const cursos = await Curso.scan().exec();

    const resultado = cursos
      .map((curso) => {
        const disciplinasFiltradas = (curso.disciplinas || []).filter(
          (disciplina) => {
            const matchNome = nomeNormalizado
              ? disciplina.nome &&
                disciplina.nome.toLowerCase().includes(nomeNormalizado)
              : true;

            const matchCodigo = codigoNormalizado
              ? disciplina.codigo &&
                disciplina.codigo.toUpperCase() === codigoNormalizado
              : true;

            return matchNome && matchCodigo;
          },
        );

        if (disciplinasFiltradas.length === 0) {
          return null;
        }

        return {
          cursoId: curso.id,
          cursoNome: curso.nome,
          modalidade: curso.modalidade,
          turno: curso.turno,
          status: curso.status,
          disciplinasEncontradas: disciplinasFiltradas,
        };
      })
      .filter(Boolean);

    return res.status(200).json({
      descricao:
        "Consulta de cursos a partir de disciplina informada, utilizando busca em arrays e subdocumentos no DynamoDB.",
      filtros: {
        nome: nome || null,
        codigo: codigo || null,
      },
      totalCursosEncontrados: resultado.length,
      dados: resultado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao consultar cursos por disciplina.",
      error: error.message,
    });
  }
};

export const getAlunosPorEndereco = async (req, res) => {
  try {
    const { rua, bairro, cep, numero } = req.query;

    if (!rua && !bairro && !cep && !numero) {
      return res.status(400).json({
        message:
          "Informe ao menos um parâmetro de busca: rua, bairro, cep ou numero.",
      });
    }

    const ruaNormalizada = rua ? rua.trim().toLowerCase() : null;
    const bairroNormalizado = bairro ? bairro.trim().toLowerCase() : null;
    const cepNormalizado = cep ? cep.trim() : null;
    const numeroNormalizado = numero ? String(numero).trim().toLowerCase() : null;

    const alunos = await Aluno.scan().exec();

    const resultado = alunos.filter((aluno) => {
      const endereco = aluno.endereco || {};

      const matchRua = ruaNormalizada
        ? endereco.rua &&
          endereco.rua.toLowerCase().includes(ruaNormalizada)
        : true;

      const matchBairro = bairroNormalizado
        ? endereco.bairro &&
          endereco.bairro.toLowerCase().includes(bairroNormalizado)
        : true;

      const matchCep = cepNormalizado
        ? endereco.cep === cepNormalizado
        : true;

      const matchNumero = numeroNormalizado
        ? endereco.numero &&
          String(endereco.numero).toLowerCase() === numeroNormalizado
        : true;

      return matchRua && matchBairro && matchCep && matchNumero;
    });

    return res.status(200).json({
      descricao:
        "Consulta de alunos por endereço informado, utilizando busca em subdocumentos no DynamoDB.",
      filtros: {
        rua: rua || null,
        bairro: bairro || null,
        cep: cep || null,
        numero: numero || null,
      },
      total: resultado.length,
      dados: resultado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao consultar alunos por endereço.",
      error: error.message,
    });
  }
};
