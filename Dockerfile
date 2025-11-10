FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --prefer-offline
COPY . .

ARG VITE_APP_VERSION
ENV VITE_APP_VERSION=$VITE_APP_VERSION

RUN npm run build

#Production
FROM nginx:1.25-alpine

RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/conf.d/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]