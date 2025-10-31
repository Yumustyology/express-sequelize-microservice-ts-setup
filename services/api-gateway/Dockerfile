FROM node:20-alpine

WORKDIR /app

# Copy workspace root manifests
COPY package*.json ./

# Copy workspaces
COPY shared ./shared
COPY services ./services

# Install deps across all workspaces
RUN npm install --workspaces

# Build only gateway
WORKDIR /app/services/api-gateway
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]
