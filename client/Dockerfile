# ----------  Etapa 1: Construcción ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copiamos los archivos de definición
COPY package*.json ./
RUN npm ci   # instala dependencias

# Copiamos el código fuente
COPY . .

# Compilamos la aplicación Angular (producción)
RUN npm run build   # o ng build --configuration production

# ----------  Etapa 2: Servidor estático ----------
FROM nginx:alpine

# Copiamos los artefactos de la etapa anterior
COPY --from=builder /app/dist/client/browser /usr/share/nginx/html

# Configuración opcional para el router de Angular (fallback a index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
