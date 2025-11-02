FROM node:20-alpine

WORKDIR /app

# Copy npm config and package manifests
COPY .npmrc ./
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY services/posts-service/package*.json ./services/posts-service/

# Install dependencies only for posts-service + shared
RUN npm install --workspace=posts-service --workspace=shared --no-audit --no-fund

# Copy source code
COPY shared ./shared
COPY services/posts-service ./services/posts-service

# Copy tsconfigs
COPY tsconfig.json ./
COPY services/posts-service/tsconfig.json ./services/posts-service/

# Build TypeScript inside the service folder
WORKDIR /app/services/posts-service
# RUN npm run build
RUN rm -rf dist && npm run build

EXPOSE 4002
CMD ["sh", "start.sh"]
