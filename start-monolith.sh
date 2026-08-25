#!/bin/bash
set -e

echo "Starting MySQL..."
mysqld_safe --datadir=/var/lib/mysql &
# Wait for MySQL to start
until mysqladmin ping -h localhost --silent; do
    echo "Waiting for MySQL to start..."
    sleep 2
done

echo "Setting up database if needed..."
mysql -u root -e "CREATE DATABASE IF NOT EXISTS veterinaria_db;"
mysql -u root -e "CREATE USER IF NOT EXISTS 'veterinaria_user'@'%' IDENTIFIED BY 'ContrasenaSuperSegura';"
mysql -u root -e "GRANT ALL PRIVILEGES ON veterinaria_db.* TO 'veterinaria_user'@'%';"
mysql -u root -e "FLUSH PRIVILEGES;"

echo "Starting Backend API in background..."
cd /app
dotnet Veterinaria.API.dll &

echo "Starting Nginx in foreground..."
nginx -g "daemon off;"
