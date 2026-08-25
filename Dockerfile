# Build Frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

# Build Backend
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-builder
WORKDIR /src
COPY API/src/ .
RUN dotnet restore "Veterinaria.API/Veterinaria.API.csproj"
WORKDIR "/src/Veterinaria.API"
RUN dotnet publish "Veterinaria.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime Image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=backend-builder /app/publish .
COPY --from=frontend-builder /app/dist/client/browser ./wwwroot

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "Veterinaria.API.dll"]
