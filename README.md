# 📦 Transactions API

API RESTful para o registro e análise de transações financeiras, construída como desafio técnico utilizando NestJS com Clean Architecture.

---

## ✍️ Sobre o Desenvolvimento

O desenvolvimento deste desafio foi uma ótima oportunidade para aplicar princípios sólidos de arquitetura e engenharia de software. A proposta de seguir a Clean Architecture exigiu um cuidado especial com a separação de responsabilidades e a injeção de dependências.

A construção dos casos de uso em camadas separadas da infraestrutura garantiu flexibilidade, além de facilitar os testes unitários e e2e. O maior desafio foi garantir que a arquitetura se mantivesse limpa mesmo em um projeto pequeno, sem sobrecarregar de abstrações desnecessárias. Com a ajuda de testes automatizados, logs estruturados e documentação via Swagger, a aplicação alcançou um nível robusto de confiabilidade e clareza.

---

## 🚀 Tecnologias Utilizadas

* **NestJS** 11+
* **TypeScript**
* **Pino** (logger estruturado)
* **Swagger** (documentação da API)
* **Jest** (testes unitários e e2e)
* **Docker + Docker Compose**
* Armazenamento em **memória (sem banco de dados)**

---

## ✅ Testes Automatizados

Foram implementados:

* **Testes unitários** para os casos de uso (use-cases)
* **Testes de integração e2e** utilizando `supertest` e NestJS TestModule
* Cobertura total validada com `yarn test:cov`

```bash
yarn test:unit    # Executa testes unitários
yarn test:e2e     # Executa testes end-to-end
yarn test         # Executa todos os testes
yarn test:cov     # Gera relatório de cobertura
```

---

## 📂 Como Rodar o Projeto Manualmente

1. Clone o repositório:

```bash
git clone https://github.com/PyDecco/transactions-api.git
cd transactions-api
```

2. Instale as dependências:

```bash
yarn
```

3. Crie um arquivo `.env` na raiz com o conteúdo mínimo:

```env
PORT=3000
LOG_LEVEL=debug
```

4. Execute em modo desenvolvimento:

```bash
yarn start:dev
```

---

## 🐳 Como Rodar o Projeto com Docker

1. Crie um arquivo `.env` na raiz (caso não tenha):

```env
PORT=3000
LOG_LEVEL=debug
```

2. Suba os containers:

```bash
docker-compose up --build
```

3. A API ficará disponível em:
   👉 `http://localhost:3000`

---

## 📘 Documentação com Swagger

Acesse a documentação interativa da API:

```
http://localhost:3000/api/docs
```

---

## 🥪 Exemplos com `curl`

### Criar uma transação

```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"amount": 123.45, "timestamp": "'$(date -Iseconds)'"}'
```

### Buscar estatísticas

```bash
curl http://localhost:3000/api/transactions/statistics
```

### Deletar todas as transações

```bash
curl -X DELETE http://localhost:3000/api/transactions
```

### Verificar o healthcheck

```bash
curl http://localhost:3000/api/health
```

---

## 🧾 Estrutura do Projeto (Clean Architecture)

```text
src/
├── controllers/         ← Interfaces (camada de entrada)
├── use-cases/           ← Casos de uso (lógica de negócio)
├── entities/            ← Entidades do domínio
├── repositories/        ← Repositórios em memória
├── interfaces/          ← Contratos e abstrações (Logger, etc)
├── infra/               ← Implementações (logger)
```
