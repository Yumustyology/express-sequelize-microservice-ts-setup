FROM node:20-alpine

WORKDIR /app

# Copy root workspace manifests
COPY package*.json ./

# Copy required workspace folders
COPY shared ./shared
COPY services/posts-service ./services/posts-service

# Install only this and shared deps
RUN npm install --workspace=posts-service --workspace=shared

WORKDIR /app/services/posts-service

EXPOSE 4002

CMD ["npm", "start"]
