# ============================================================
# Stage 1 — Build the React / Vite frontend
# ============================================================
FROM node:20-alpine AS frontend-build
WORKDIR /frontend

# Install dependencies (ci = reproducible, uses package-lock.json)
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copy source and build
COPY frontend/ ./
RUN npm run build
# Output: /frontend/dist/


# ============================================================
# Stage 2 — Compile the TypeScript backend
# ============================================================
FROM node:20-alpine AS backend-build
WORKDIR /backend

# Install ALL deps (including devDeps like typescript/ts-node needed for tsc)
COPY backend/package.json backend/package-lock.json ./
RUN npm ci

# Copy source and compile
COPY backend/ ./
RUN npm run build
# Output: /backend/dist/


# ============================================================
# Stage 3 — Production runner
# Layout inside container:
#   /app/dist/      ← compiled backend (dist/server.js …)
#   /app/client/    ← built React app (served as static files)
#   /app/node_modules/
#   /app/package.json
# ============================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 expressjs

# Install only production backend dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled backend
COPY --from=backend-build /backend/dist ./dist

# Copy compiled frontend into /app/client/
# Express will serve this as static files (see src/app.ts)
COPY --from=frontend-build /frontend/dist ./client

USER expressjs

# Render injects PORT at runtime — env.ts reads process.env.PORT (default 3001)
EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3001) + '/api/v1/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["node", "dist/server.js"]
