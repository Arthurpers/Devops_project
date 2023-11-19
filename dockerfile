# Base
FROM node:18 as base

WORKDIR /app

COPY package*.json ./
    
RUN npm install

COPY . .

# Build

FROM base as builder

WORKDIR /app

RUN npm run build

# Production

FROM node:18-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./

USER node

EXPOSE 3000

ENTRYPOINT ["node","./server.js"]