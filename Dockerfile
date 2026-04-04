# Stage 1: Build
FROM node:22-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production (Nginx)
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Копируем кастомный конфиг nginx (если есть) или оставляем дефолтный
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]