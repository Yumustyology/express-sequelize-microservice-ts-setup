FROM node:20-alpine

WORKDIR /app

# Copy npm config and package manifests
COPY .npmrc ./
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY services/users-service/package*.json ./services/users-service/

# Install dependencies only for users-service + shared
RUN npm install --workspace=users-service --workspace=shared --no-audit --no-fund

# Copy source code
COPY shared ./shared
COPY services/users-service ./services/users-service

# Copy tsconfigs
COPY tsconfig.json ./
COPY services/users-service/tsconfig.json ./services/users-service/

# Build TypeScript inside the service folder
WORKDIR /app/services/users-service
# RUN npm run build
RUN rm -rf dist && npm run build

EXPOSE 4001
CMD ["sh", "start.sh"]
