# Amazon DynamoDB (Local) + Node.js

## Integrantes
- Antonio Crivelari
- Guilherme Batista
- Gabriel Viana
- Gabriel Vieira
- João Victor Sobreira
- Mateus Xavier

## Sobre o projeto
Este projeto é uma API REST em Node.js com Express e DynamoDB, usando DynamoDB Local para desenvolvimento. A documentação da API é gerada com Swagger e a aplicação trabalha com três entidades principais: **Alunos**, **Cursos** e **Matrículas**.

A API implementa CRUD completo para as três entidades, com validações de domínio, filtros de consulta e normalização de dados.

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
- Validação de carga horária, duração e quantidade de vagas (> 0)
- Validação de disciplinas obrigatórias
- Bloqueio de código de disciplina duplicado no mesmo curso
- Validação de pré-requisitos (devem existir entre as disciplinas do curso)

### Matrículas
- Validação de situação por enum
- Validação de datas no formato `YYYY-MM-DD`
- Data prevista de conclusão deve ser posterior à data da matrícula
- Período atual deve ser >= 1
- Período atual não pode exceder a duração do curso
- Número de matrícula único
- Impede mais de uma matrícula ATIVA para o mesmo aluno no mesmo curso
- Verificação de existência de aluno e curso antes de criar/atualizar

## Endpoints

### Base
- `GET /` - Mensagem inicial da API

### Alunos
- `POST /api/alunos` - Criar aluno
- `GET /api/alunos` - Listar alunos (filtros: `status`, `nome`, `email`, `registroAcademico`)
- `GET /api/alunos/:id` - Buscar aluno por ID
- `PUT /api/alunos/:id` - Atualizar aluno
- `DELETE /api/alunos/:id` - Remover aluno

### Cursos
- `POST /api/cursos` - Criar curso
- `GET /api/cursos` - Listar cursos (filtros: `status`, `modalidade`, `turno`, `areaConhecimento`, `nome`)
- `GET /api/cursos/:id` - Buscar curso por ID
- `PUT /api/cursos/:id` - Atualizar curso
- `DELETE /api/cursos/:id` - Remover curso

### Matrículas
- `POST /api/matriculas` - Criar matrícula
- `GET /api/matriculas` - Listar matrículas (filtros: `alunoId`, `cursoId`, `situacao`, `numeroMatricula`)
- `GET /api/matriculas/:id` - Buscar matrícula por ID
- `PUT /api/matriculas/:id` - Atualizar matrícula
- `DELETE /api/matriculas/:id` - Remover matrícula

## Tecnologias utilizadas
- Node.js
- Express
- DynamoDB Local
- Dynamoose
- Swagger UI
- CORS
- dotenv

## Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- Docker instalado
- Docker Compose instalado

### 1. Instalar as dependências
```bash
npm install
```

### 2. Subir o DynamoDB Local
```bash
docker compose up -d
```

### 3. Iniciar a aplicação
```bash
npm start
```

### 4. Popular dados iniciais (opcional)
```bash
npm run seed
```

### 5. Acessar a aplicação
- API principal: http://localhost:3000
- Documentação Swagger: http://localhost:3000/api-docs

## Variáveis de ambiente

Arquivo de exemplo: `.env.example`

```env
PORT=3000
DYNAMODB_ENDPOINT=http://localhost:5407
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=local
AWS_SECRET_ACCESS_KEY=local
```

## Observações importantes
- O projeto usa variáveis de ambiente com dotenv.
- Se o DynamoDB Local estiver em uma porta diferente da configurada no projeto, ajuste o endpoint em src/config/dynamodb.js ou defina a variável de ambiente correspondente.
- Se a documentação Swagger mostrar Failed to fetch, verifique se a aplicação está rodando na porta correta e se o DynamoDB Local está ativo.

## Estrutura geral
- src/server.js: inicialização do servidor
- src/routes: rotas da aplicação
- src/controllers: regras da aplicação
- src/models: modelos do DynamoDB
- src/config: configuração de conexão com o banco
- src/seeds: scripts para popular o banco local
- src/swagger.js: configuração do Swagger
