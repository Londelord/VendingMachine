FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm update rollup @rollup/rollup-linux-x64-gnu

CMD ["npm", "run", "dev"]