# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["src/Veterinaria.API/Veterinaria.API.csproj", "src/Veterinaria.API/"]
COPY ["src/Veterinaria.Application/Veterinaria.Application.csproj", "src/Veterinaria.Application/"]
COPY ["src/Veterinaria.Domain/Veterinaria.Domain.csproj", "src/Veterinaria.Domain/"]
COPY ["src/Veterinaria.Infrastructure/Veterinaria.Infrastructure.csproj", "src/Veterinaria.Infrastructure/"]
RUN dotnet restore "src/Veterinaria.API/Veterinaria.API.csproj"
COPY . .
WORKDIR "/src/src/Veterinaria.API"
RUN dotnet build "Veterinaria.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Veterinaria.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Veterinaria.API.dll"]
