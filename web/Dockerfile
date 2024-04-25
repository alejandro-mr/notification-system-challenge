FROM node:20.12.2-alpine

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]