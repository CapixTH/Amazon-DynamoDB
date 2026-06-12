# Amazon DynamoDB (Local) + Node.js

## Integrantes
- Antonio Crivelari
- Guilherme Batista
- Gabriel Viana
- Gabriel Vieira
- João Victor Sobreira
- Mateus Xavier

## Sobre o projeto
Este projeto é uma API em Node.js com Express e DynamoDB, usando DynamoDB Local para desenvolvimento. A documentação da API é gerada com Swagger e a aplicação trabalha com três tabelas principais: **Alunos**, **Cursos** e **Matrículas**. Essas tabelas permitem organizar o cadastro dos alunos, a oferta de cursos e o vínculo entre aluno e curso por meio das matrículas.

## Funcionalidades
- Inicialização da aplicação com Express
- Configuração de CORS
- Documentação da API com Swagger
- Conexão com DynamoDB Local
- Cadastro de alunos
- Listagem de alunos
- Busca de aluno por ID

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

### 4. Acessar a aplicação
- API principal: http://localhost:3000
- Documentação Swagger: http://localhost:3000/api-docs

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
- src/swagger.js: configuração do Swagger
