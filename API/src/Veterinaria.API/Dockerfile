# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["Veterinaria.API/Veterinaria.API.csproj", "Veterinaria.API/"]
COPY ["Veterinaria.Application/Veterinaria.Application.csproj", "Veterinaria.Application/"]
COPY ["Veterinaria.Domain/Veterinaria.Domain.csproj", "Veterinaria.Domain/"]
COPY ["Veterinaria.Infrastructure/Veterinaria.Infrastructure.csproj", "Veterinaria.Infrastructure/"]
RUN dotnet restore "Veterinaria.API/Veterinaria.API.csproj"
COPY . .
WORKDIR "/src/Veterinaria.API"
RUN dotnet build "Veterinaria.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Veterinaria.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Veterinaria.API.dll"]
