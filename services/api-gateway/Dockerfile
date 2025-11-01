FROM node:20-alpine

WORKDIR /app

COPY .npmrc ./
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY services/api-gateway/package*.json ./services/api-gateway/

RUN npm config set registry https://registry.npmmirror.com \
 && npm install --workspace=api-gateway --workspace=shared --no-audit --no-fund

COPY shared ./shared
COPY services/api-gateway ./services/api-gateway
COPY tsconfig.json ./
COPY services/api-gateway/tsconfig.json ./services/api-gateway/

WORKDIR /app/services/api-gateway
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/index.js"]
