# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Install Prisma CLI for client generation
RUN npm install --save-dev prisma

# Copy the entire application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Run stage
FROM node:20-alpine
WORKDIR /app

# Copy built application and dependencies from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3001

CMD ["node", "dist/server.js"]
