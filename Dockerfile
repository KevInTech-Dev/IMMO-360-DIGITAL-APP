FROM node:22-alpine

WORKDIR /app

# Copy package files from backend
COPY backend/package*.json ./
COPY backend/prisma ./prisma
COPY backend/tsconfig*.json ./
COPY backend/nest-cli.json ./
COPY backend/prisma.config.ts ./
COPY backend/src ./src

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Install production dependencies only
RUN npm ci --production

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
