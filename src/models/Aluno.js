import dynamoose from "../config/dynamodb.js";

const enderecoSchema = new dynamoose.Schema(
  {
    rua: {
      type: String,
      required: true,
      trim: true,
    },
    bairro: {
      type: String,
      required: true,
      trim: true,
    },
    cep: {
      type: String,
      required: true,
      trim: true,
    },
    numero: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    saveUnknown: false,
    timestamps: false,
  },
);

const alunoSchema = new dynamoose.Schema(
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
    email: {
      type: String,
      required: true,
      trim: true,
    },
    cpf: {
      type: String,
      required: true,
      trim: true,
    },
    dataNascimento: {
      type: String,
      required: true,
    },
    registroAcademico: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["ATIVO", "INATIVO", "FORMADO", "EVADIDO"],
      index: {
        name: "statusIndex",
        type: "global",
        project: true,
      },
    },
    endereco: {
      type: Object,
      required: true,
      schema: enderecoSchema,
    },
  },
  {
    timestamps: true,
    saveUnknown: false,
  },
);

const Aluno = dynamoose.model("alunos", alunoSchema, {
  create: true,
  waitForActive: true,
});

export default Aluno;
