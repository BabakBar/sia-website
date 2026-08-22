# =============================================================================
# sia-website Dockerfile
# Multi-stage build with Bun and Nginx Alpine
# =============================================================================

# Stage 1: Build static site
FROM oven/bun:1.2-alpine AS builder
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Stage 2: Production Nginx Server
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Clean default html
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled static assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx config with Umami reverse proxy
COPY ops/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
