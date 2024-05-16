FROM node:22-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# This step is separated from the rest of the build process to enable
# caching the pnmp installation step
RUN <<EOF
corepack enable
EOF

COPY . /app
WORKDIR /app

RUN <<EOF
pnpm install
pnpm run build
EOF

FROM caddy:2.7.6-alpine

COPY --from=build /app/apps/playground/dist /usr/share/caddy