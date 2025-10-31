FROM node:20-alpine

WORKDIR /app

# Copy root workspace manifests
COPY package*.json ./

# Copy workspaces
COPY shared ./shared
COPY services/users-service ./services/users-service

# Install ONLY this workspace + shared dependencies
RUN npm install --workspace=users-service --workspace=shared

WORKDIR /app/services/users-service

EXPOSE 4001

CMD ["npm", "start"]
