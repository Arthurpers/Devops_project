# base
FROM node:18 as base

WORKDIR /app

COPY package*.json ./
    
RUN npm install

COPY . .

# for build

FROM base as builder

WORKDIR /app

RUN npm run build

# for production

FROM node:18-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./

EXPOSE 3000

ENTRYPOINT ["npm","start"]