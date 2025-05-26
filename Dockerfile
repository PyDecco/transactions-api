# Etapa de build
FROM node:23.5.0-alpine as builder

WORKDIR /app

# Instala dependências
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia os arquivos do projeto
COPY . .

# Compila a aplicação e exibe conteúdo da dist
RUN yarn build && ls -l dist

# Etapa de produção
FROM node:23.5.0-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY .env .env

EXPOSE 3000
CMD ["node", "dist/main"]


