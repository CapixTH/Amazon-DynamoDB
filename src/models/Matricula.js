import dynamoose from "../config/dynamodb.js";

const matriculaSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    alunoId: {
      type: String,
      required: true,
      trim: true,
    },
    cursoId: {
      type: String,
      required: true,
      trim: true,
    },
    numeroMatricula: {
      type: String,
      required: true,
      trim: true,
    },
    dataMatricula: {
      type: String,
      required: true,
    },
    situacao: {
      type: String,
      required: true,
      enum: ["ATIVA", "TRANCADA", "CANCELADA", "CONCLUIDA"],
    },
    periodoAtual: {
      type: Number,
      required: true,
    },
    dataPrevistaConclusao: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    saveUnknown: false,
  },
);

const Matricula = dynamoose.model("matriculas", matriculaSchema, {
  create: true,
  waitForActive: true,
});

export default Matricula;
