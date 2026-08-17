# Stage 1: Build Angular application
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/dist/client/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
