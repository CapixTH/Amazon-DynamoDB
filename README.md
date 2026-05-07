# Amazon DynamoDB (Local) + Node.js — Trabalho Final (NoSQL)

## Integrantes
- Antonio Crivelari
- Guilherme Batista
- Gabriel Viana
- Gabriel Vieira
- João Victor Sobreira
- Mateus Xavier

## Banco escolhido
**Amazon DynamoDB** — modelo **Chave-Valor** (Key-Value) / Wide-Column (dependendo da modelagem).  
Para este trabalho, consideramos o uso principal como **Key-Value** com suporte a **atributos e índices**.

---

## 1) Fundamentação teórica (resumo)

### 1.1 Tipo de banco (NoSQL)
O **Amazon DynamoDB** é um banco **NoSQL** (AWS) baseado em:
- **Tabelas** com **Partition Key** (chave de partição) e, opcionalmente, **Sort Key** (chave de ordenação).
- Itens (items) compostos por **atributos** (map, list, string, number, boolean etc.).
- Suporte a **Secondary Indexes** (GSI/LSI) para diferentes padrões de consulta.

Apesar de frequentemente classificado como **Key-Value**, ele também se aproxima de um modelo **Wide-Column** por permitir atributos flexíveis e consultas eficientes por chave e índices.

### 1.2 Teorema CAP
No contexto do CAP (Consistência, Disponibilidade e Tolerância a Partição), o DynamoDB é normalmente descrito como:
- **AP (Availability + Partition Tolerance)** por padrão: prioriza disponibilidade e tolerância a partições.
- Pode oferecer **consistência forte** em leituras em cenários suportados, com trade-offs.

Na prática:
- **Tolerância a partição (P):** essencial em sistemas distribuídos.
- **Disponibilidade (A):** alta disponibilidade para leitura/escrita.
- **Consistência (C):** pode variar conforme configuração/estratégia de leitura.

### 1.3 Casos de uso
**Quando utilizar**
- Aplicações com **alta taxa de leitura/escrita** e **baixa latência**.
- Sistemas que precisam de **escala horizontal**.
- Catálogos, carrinhos, perfis de usuário, eventos, IoT, logs e tracking.

**Vantagens**
- Baixa latência e alta escalabilidade.
- Modelo flexível (atributos variáveis).
- Índices secundários para padrões adicionais de consulta.

**Limitações / cuidados**
- Consultas são otimizadas para acesso por chave; consultas ad-hoc exigem planejamento (índices).
- “Joins” não existem nativamente; a modelagem costuma ser **denormalizada**.
- Modelagem correta é crucial para evitar *scans* desnecessários.

### 1.4 Ferramentas e ecossistema
- **AWS SDK** (Node.js/TypeScript, Java, Python, etc.).
- **DynamoDB Local** (execução local) + **Docker**.
- Interfaces:
  - AWS Console (cloud)
  - Ferramentas de terceiros (GUI) quando aplicável.
- Execução:
  - **Cloud (AWS)** ou **local** via DynamoDB Local.

---

## 2) Execução prática (DynamoDB Local com Docker)

### Pré-requisitos
- **Docker** e **Docker Compose**
- **Node.js** (recomendado LTS)
- (Opcional) **AWS CLI** para testes

### Subir o DynamoDB Local
1. Suba os containers:
```bash
docker compose up -d
```

2. Verifique se está rodando:
```bash
docker ps
```

> O DynamoDB Local normalmente expõe a porta **8000**.

### Conexão local
A aplicação Node.js deve se conectar ao endpoint:
- `http://localhost:8000`

---

## 3) Aplicação (Node.js)

### Objetivo da aplicação
- Conectar no DynamoDB Local
- **Criar tabelas** (modelagem)
- **Popular com dados mockados** (seed)
- Disponibilizar **CRUD** (Create/Read/Update/Delete)
- Demonstrar **consultas complexas** (na entrega final)

### Estrutura (prevista)
> A estrutura pode mudar conforme evolução do trabalho.
- `docker-compose.yml` — DynamoDB Local
- `src/` — código da aplicação
- `scripts/` — scripts para criação de tabelas e seed

---

## Como executar (primeira entrega — foco no README)

> As instruções abaixo são o fluxo esperado. Caso algum script ainda não exista, ele será adicionado nas próximas entregas.

1) Instalar dependências:
```bash
npm install
```

2) Subir o DynamoDB Local:
```bash
docker compose up -d
```

3) Rodar scripts (criação e seed):
```bash
npm run db:setup
npm run db:seed
```

4) Iniciar a aplicação:
```bash
npm run dev
```

---

## Scripts (planejados)
- `db:setup` — cria tabelas e índices
- `db:seed` — popula com dados mockados
- `dev` — inicia a aplicação

---

## Entregáveis do trabalho
- Código da aplicação
- Scripts do banco (criação/modelagem e seed)
- Slides (PDF/PPT)
- Este **README** (integrantes, banco escolhido e instruções)

---

## Observações
- Este repositório utiliza **DynamoDB Local** para desenvolvimento e demonstração.
- Para a apresentação final, serão demonstrados CRUD e pelo menos **2 consultas complexas**.
