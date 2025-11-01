FROM node:20-alpine

WORKDIR /app

# Copy npm config
COPY .npmrc ./

# Copy root package manifests
COPY package*.json ./

# Copy workspace manifests only (cache layer)
COPY shared/package*.json ./shared/
COPY services/users-service/package*.json ./services/users-service/

# Install only needed workspace deps
RUN npm install --workspace=users-service --workspace=shared --no-audit --no-fund

# Copy source code
COPY shared ./shared
COPY services/users-service ./services/users-service

# Copy tsconfigs
COPY tsconfig.json ./
COPY services/users-service/tsconfig.json ./services/users-service/

WORKDIR /app/services/users-service

EXPOSE 4001

CMD ["npm", "start"]
