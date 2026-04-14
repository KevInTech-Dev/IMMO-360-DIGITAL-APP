# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Copy all necessary files from backend
COPY backend/package*.json ./
COPY backend/prisma ./prisma
COPY backend/tsconfig*.json ./
COPY backend/nest-cli.json ./
COPY backend/prisma.config.ts ./
COPY backend/src ./src

# Install all dependencies (including dev)
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Debug: List what was built
RUN ls -la dist/ || echo "dist directory not found"
RUN ls -la dist/main* || echo "main files not found"

# Stage 2: Runtime
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./
COPY backend/prisma ./prisma
COPY backend/prisma.config.ts ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy compiled application from builder
COPY --from=builder /app/dist ./dist

# Copy Prisma Client
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
