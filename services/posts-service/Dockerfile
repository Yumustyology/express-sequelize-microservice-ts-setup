FROM node:20-alpine

WORKDIR /app

# Copy npm config
COPY .npmrc ./

# Copy root package manifests
COPY package*.json ./

# Copy workspace manifests only (cache layer)
COPY shared/package*.json ./shared/
COPY services/posts-service/package*.json ./services/posts-service/

# Install dependencies for shared + this service only
RUN npm install --workspace=posts-service --workspace=shared --no-audit --no-fund

# Copy source code
COPY shared ./shared
COPY services/posts-service ./services/posts-service

# Copy tsconfigs if TS used
COPY tsconfig.json ./
COPY services/posts-service/tsconfig.json ./services/posts-service/

WORKDIR /app/services/posts-service

EXPOSE 4002

CMD ["npm", "start"]
