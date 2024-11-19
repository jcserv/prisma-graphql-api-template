FROM node:20-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm prisma:gen

RUN pnpm compile

EXPOSE 4000

CMD ["node", "./dist/src/index.js"]