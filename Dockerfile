FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --prefer-offline
COPY . .

RUN npm run build

ARG VITE_APP_VERSION
ENV VITE_APP_VERSION=$VITE_APP_VERSION

FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist


FROM nginxinc/nginx-unprivileged:alpine3.22 AS runner

USER nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY --chown=nginx:nginx  --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]