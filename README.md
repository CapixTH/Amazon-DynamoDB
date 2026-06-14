# Amazon DynamoDB (Local) + Node.js

## Integrantes
- Antonio Crivelari
- Guilherme Batista
- Gabriel Viana
- Gabriel Vieira
- João Victor Sobreira
- Mateus Xavier

## Sobre o projeto
Este projeto é uma API REST em Node.js com Express e DynamoDB, usando DynamoDB Local para desenvolvimento. A documentação da API é gerada com Swagger e a aplicação trabalha com três entidades principais:

- Alunos
- Cursos
- Matrículas

A API implementa CRUD completo para as três entidades, com validações de domínio, filtros de consulta, normalização de dados e consultas demonstrativas equivalentes a operações comuns do MongoDB, adaptadas para DynamoDB.

---

## Funcionalidades
- Inicialização da aplicação com Express
- Configuração de CORS
- Documentação da API com Swagger
- Conexão com DynamoDB Local via Dynamoose
- CRUD completo de alunos
- CRUD completo de cursos
- CRUD completo de matrículas
- Filtros de listagem por query params
- Validações de formato e regras de negócio
- Normalização de campos (CPF, CEP, e-mail e número de matrícula)
- Seed de dados para alunos, cursos e matrículas
- Consultas demonstrativas equivalentes a:
  - `find`
  - `aggregate`
  - `$match`
  - `$project`
  - `$lookup`
  - `$unwind`
  - `$group`
- Uso de arrays e subdocumentos

---

## Regras e validações implementadas

### Alunos
- Campos obrigatórios com validação de preenchimento
- Validação de e-mail
- Validação de CPF
- Validação de data de nascimento no formato `YYYY-MM-DD`
- Bloqueio de data de nascimento futura
- Unicidade de CPF
- Unicidade de registro acadêmico

### Cursos
- Validação de modalidade, turno e status por enum
- Validação de carga horária, duração e quantidade de vagas (`> 0`)
- Validação de disciplinas obrigatórias
- Bloqueio de código de disciplina duplicado no mesmo curso
- Validação de pré-requisitos (devem existir entre as disciplinas do curso)

### Matrículas
- Validação de situação por enum
- Validação de datas no formato `YYYY-MM-DD`
- Data prevista de conclusão deve ser posterior à data da matrícula
- Período atual deve ser `>= 1`
- Período atual não pode exceder a duração do curso
- Número de matrícula único
- Impede mais de uma matrícula `ATIVA` para o mesmo aluno no mesmo curso
- Verificação de existência de aluno e curso antes de criar/atualizar

---

## Endpoints

### Base
- `GET /` - Mensagem inicial da API

### Alunos
- `POST /api/alunos` - Criar aluno
- `GET /api/alunos` - Listar alunos  
  Filtros: `status`, `nome`, `email`, `registroAcademico`
- `GET /api/alunos/:id` - Buscar aluno por ID
- `PUT /api/alunos/:id` - Atualizar aluno
- `DELETE /api/alunos/:id` - Remover aluno

### Cursos
- `POST /api/cursos` - Criar curso
- `GET /api/cursos` - Listar cursos  
  Filtros: `status`, `modalidade`, `turno`, `areaConhecimento`, `nome`
- `GET /api/cursos/:id` - Buscar curso por ID
- `PUT /api/cursos/:id` - Atualizar curso
- `DELETE /api/cursos/:id` - Remover curso

### Matrículas
- `POST /api/matriculas` - Criar matrícula
- `GET /api/matriculas` - Listar matrículas  
  Filtros: `alunoId`, `cursoId`, `situacao`, `numeroMatricula`
- `GET /api/matriculas/:id` - Buscar matrícula por ID
- `PUT /api/matriculas/:id` - Atualizar matrícula
- `DELETE /api/matriculas/:id` - Remover matrícula

### Consultas demonstrativas
- `GET /api/consultas/matriculas-ativas`  
  Equivalente a `find`
- `GET /api/consultas/alunos-ativos-resumo`  
  Equivalente a `aggregate + $match + $project`
- `GET /api/consultas/matriculas-detalhadas`  
  Equivalente a `$lookup`
- `GET /api/consultas/disciplinas-por-periodo`  
  Equivalente a `$unwind + $group`
- `GET /api/consultas/cursos-por-disciplina?nome=...&codigo=...`  
  Busca em arrays e subdocumentos
- `GET /api/consultas/alunos-por-endereco?rua=...&bairro=...&cep=...&numero=...`  
  Busca em subdocumentos

---

## Equivalência MongoDB x DynamoDB
Como o DynamoDB não possui pipeline de agregação nativo igual ao MongoDB, as consultas equivalentes foram implementadas combinando operações de leitura com Dynamoose (`scan`, `get`) e processamento em JavaScript no backend (`map`, `filter`, `flatMap`, `reduce`).

### Equivalências aplicadas
- `find` → `scan`, `get`
- `aggregate` → processamento no backend
- `$match` → filtros com `scan` + `filter`
- `$project` → seleção de campos com `map`
- `$lookup` → junção feita na aplicação
- `$unwind` → expansão de arrays com `flatMap`
- `$group` → agrupamento com `reduce`
- Arrays → `disciplinas` em `Curso`
- Subdocumentos → `endereco` em `Aluno` e `disciplinas` em `Curso`

---

## Tecnologias utilizadas
- Node.js
- Express
- DynamoDB Local
- Dynamoose
- Swagger UI
- CORS
- dotenv

---

## Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- Docker instalado
- Docker Compose instalado

### 1. Clonar o repositório
```bash
git clone https://github.com/CapixTH/Amazon-DynamoDB.git
cd Amazon-DynamoDB
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` com base no `.env.example`.

Exemplo:
```env
PORT=3000
DYNAMODB_ENDPOINT=http://localhost:5407
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=local
AWS_SECRET_ACCESS_KEY=local
```

### 4. Subir o DynamoDB Local
```bash
docker compose up -d
```

### 5. Iniciar a aplicação
```bash
npm start
```

### 6. Popular dados iniciais (opcional)
```bash
npm run seed
```

### 7. Acessar a aplicação
- API principal: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`

---

## Exemplos de inserção

### Exemplo de aluno
**POST** `/api/alunos`

```json
{
  "nome": "João da Silva",
  "email": "joao.silva@email.com",
  "cpf": "123.456.789-09",
  "dataNascimento": "2002-08-15",
  "registroAcademico": "RA20260001",
  "status": "ATIVO",
  "endereco": {
    "rua": "Rua das Flores",
    "bairro": "Centro",
    "cep": "29100000",
    "numero": "120"
  }
}
```

### Exemplo de curso
**POST** `/api/cursos`

```json
{
  "nome": "Sistemas de Informação",
  "descricao": "Curso superior voltado para desenvolvimento de software, banco de dados e gestão de sistemas.",
  "cargaHoraria": 3200,
  "duracaoSemestres": 8,
  "modalidade": "PRESENCIAL",
  "turno": "NOTURNO",
  "areaConhecimento": "Tecnologia da Informação",
  "coordenador": "Prof. Carlos Eduardo",
  "quantidadeVagas": 40,
  "status": "ATIVO",
  "disciplinas": [
    {
      "codigo": "SI101",
      "nome": "Algoritmos",
      "periodo": 1,
      "cargaHoraria": 80,
      "obrigatoria": true,
      "preRequisitos": []
    },
    {
      "codigo": "SI102",
      "nome": "Lógica de Programação",
      "periodo": 1,
      "cargaHoraria": 80,
      "obrigatoria": true,
      "preRequisitos": []
    },
    {
      "codigo": "SI201",
      "nome": "Estrutura de Dados",
      "periodo": 2,
      "cargaHoraria": 80,
      "obrigatoria": true,
      "preRequisitos": ["SI101", "SI102"]
    }
  ]
}
```

### Exemplo de matrícula
**POST** `/api/matriculas`

> Para criar a matrícula, use um `alunoId` e um `cursoId` já existentes no banco.

```json
{
  "alunoId": "11111111-1111-1111-1111-111111111111",
  "cursoId": "22222222-2222-2222-2222-222222222222",
  "numeroMatricula": "MAT20260001",
  "dataMatricula": "2026-02-01",
  "situacao": "ATIVA",
  "periodoAtual": 1,
  "dataPrevistaConclusao": "2029-12-01"
}
```

---

## Exemplos de consultas

### Buscar matrículas ativas
```http
GET /api/consultas/matriculas-ativas
```

### Buscar resumo de alunos ativos
```http
GET /api/consultas/alunos-ativos-resumo
```

### Buscar matrículas detalhadas
```http
GET /api/consultas/matriculas-detalhadas
```

### Buscar disciplinas agrupadas por período
```http
GET /api/consultas/disciplinas-por-periodo
```

### Buscar cursos por disciplina
```http
GET /api/consultas/cursos-por-disciplina?nome=algoritmos
```

ou

```http
GET /api/consultas/cursos-por-disciplina?codigo=SI101
```

### Buscar alunos por endereço
```http
GET /api/consultas/alunos-por-endereco?bairro=centro
```

ou

```http
GET /api/consultas/alunos-por-endereco?rua=rua das flores&numero=120
```

---

## Observações importantes
- O projeto usa variáveis de ambiente com `dotenv`.
- O DynamoDB Local está configurado para uso em memória no ambiente local atual.
- Se o container for reiniciado, os dados podem ser perdidos, então pode ser necessário rodar novamente:
  ```bash
  npm run seed
  ```
- Se a documentação Swagger não atualizar, reinicie a aplicação:
  ```bash
  npm start
  ```
- Se o Swagger mostrar erro de carregamento, verifique:
  - se a API está rodando na porta correta
  - se o DynamoDB Local está ativo
  - se o arquivo `.env` está configurado corretamente

---

## Estrutura geral
- `src/server.js` - inicialização do servidor
- `src/routes` - rotas da aplicação
- `src/controllers` - regras da aplicação
- `src/models` - modelos do DynamoDB
- `src/config` - configuração de conexão com o banco
- `src/seeds` - scripts para popular o banco local
- `src/swagger.js` - configuração do Swagger

---

### 8. Acessar o DynamoDB Local pelo navegador com dynamodb-admin

Instale o pacote globalmente, se necessário:

```bash
npm install -g dynamodb-admin
```

No PowerShell, configure as variáveis:

```powershell
$env:DYNAMO_ENDPOINT="http://localhost:5407"
$env:AWS_REGION="us-east-1"
$env:AWS_ACCESS_KEY_ID="local"
$env:AWS_SECRET_ACCESS_KEY="local"
dynamodb-admin
```

Acesse no navegador:

```text
http://localhost:8001
```

---

## Objetivo acadêmico
Este projeto também foi estruturado para demonstrar, no contexto do DynamoDB, equivalentes práticos de consultas normalmente associadas ao MongoDB, incluindo operações com arrays, subdocumentos, junções lógicas e agregações realizadas no backend.