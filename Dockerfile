# syntax=docker/dockerfile:1

# Build stage — the app is a Vite SPA with an SSR prerender pass, so the build
# needs devDependencies (typescript, vite, sharp) present.
FROM oven/bun:1.2.23 AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# tsc && vite build && prerender && verify-static-output
RUN bun run build

# Runtime stage
FROM nginx:1.29-alpine AS runtime

COPY ops/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Match the rest of the estate: nginx must be able to read every built asset.
RUN chmod -R a+rX /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1
