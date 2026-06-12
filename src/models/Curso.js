import dynamoose from "../config/dynamodb.js";

const disciplinaSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
      trim: true,
    },
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    periodo: {
      type: Number,
      required: true,
    },
    cargaHoraria: {
      type: Number,
      required: true,
    },
    obrigatoria: {
      type: Boolean,
      required: true,
    },
    preRequisitos: {
      type: Array,
      schema: [String],
      default: [],
    },
  },
  {
    saveUnknown: false,
    timestamps: false,
  }
);

const cursoSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      required: true,
      trim: true,
    },
    cargaHoraria: {
      type: Number,
      required: true,
    },
    duracaoSemestres: {
      type: Number,
      required: true,
    },
    modalidade: {
      type: String,
      required: true,
      enum: ["PRESENCIAL", "EAD", "HIBRIDO"],
    },
    turno: {
      type: String,
      required: true,
      enum: ["MATUTINO", "VESPERTINO", "NOTURNO", "INTEGRAL"],
    },
    areaConhecimento: {
      type: String,
      required: true,
      trim: true,
    },
    coordenador: {
      type: String,
      required: true,
      trim: true,
    },
    quantidadeVagas: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["ATIVO", "INATIVO"],
    },
    disciplinas: {
      type: Array,
      required: true,
      schema: [disciplinaSchema],
    },
  },
  {
    timestamps: true,
    saveUnknown: false,
  }
);

const Curso = dynamoose.model("cursos", cursoSchema, {
  create: true,
  waitForActive: true,
});

export default Curso;