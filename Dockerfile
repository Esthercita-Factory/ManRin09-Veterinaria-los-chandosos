# -------------------------
# STAGE 1: Build Frontend
# -------------------------
FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

# -------------------------
# STAGE 2: Build Backend
# -------------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-builder
WORKDIR /src
COPY API/src/Veterinaria.API/Veterinaria.API.csproj API/src/Veterinaria.API/
COPY API/src/Veterinaria.Application/Veterinaria.Application.csproj API/src/Veterinaria.Application/
COPY API/src/Veterinaria.Domain/Veterinaria.Domain.csproj API/src/Veterinaria.Domain/
COPY API/src/Veterinaria.Infrastructure/Veterinaria.Infrastructure.csproj API/src/Veterinaria.Infrastructure/
RUN dotnet restore API/src/Veterinaria.API/Veterinaria.API.csproj
COPY API/src/ API/src/
WORKDIR /src/API/src/Veterinaria.API
RUN dotnet publish Veterinaria.API.csproj -c Release -o /app/publish /p:UseAppHost=false

# -------------------------
# STAGE 3: Final Monolith
# -------------------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0

# Install MySQL and Nginx
RUN apt-get update && \
    apt-get install -y mariadb-server mariadb-client nginx && \
    rm -rf /var/lib/apt/lists/*

# Setup MySQL
RUN mkdir -p /var/run/mysqld && chown -R mysql:mysql /var/run/mysqld && \
    mkdir -p /var/lib/mysql && chown -R mysql:mysql /var/lib/mysql
RUN mysql_install_db --user=mysql --datadir=/var/lib/mysql

# Copy backend
WORKDIR /app
COPY --from=backend-builder /app/publish .

# Copy frontend
COPY --from=frontend-builder /app/dist/client/browser /usr/share/nginx/html

# Copy Nginx config
COPY nginx.monolith.conf /etc/nginx/conf.d/default.conf

# Copy Start script
COPY start-monolith.sh /app/start-monolith.sh
RUN chmod +x /app/start-monolith.sh

# Environment variables
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:5000
ENV ConnectionStrings__DefaultConnection="Server=127.0.0.1;Port=3306;Database=veterinaria_db;User=veterinaria_user;Password=ContrasenaSuperSegura;"

# Ports
EXPOSE 80 5000 3306

CMD ["/app/start-monolith.sh"]
