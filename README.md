# 🐾 Veterinaria Los Chandosos - Sistema de Gestión

Sistema integral para la administración y gestión clínica de pacientes veterinarios, propietarios y citas médicas. Diseñado e implementado siguiendo **Clean Architecture** (Arquitectura Limpia) en el backend y una arquitectura modular basada en componentes en el frontend, todo completamente contenedorizado con **Docker**.

---

## 🚀 Tecnologías Principales

- **Backend:** ASP.NET Core 10 (`net10.0`), Entity Framework Core, LINQ
- **Frontend:** Angular 19+, TypeScript, Tailwind CSS
- **Base de Datos:** MySQL 8.0
- **Contenedores y DevOps:** Docker & Docker Compose, Nginx

---

## 🏛️ Arquitectura del Sistema

El backend está estructurado bajo los principios de **Clean Architecture** e Inversión de Dependencias (DIP), aislando las reglas del negocio de los detalles técnicos y motores de persistencia:

```text
API/src/
├── Veterinaria.Domain/          # Núcleo: Entidades puras (Mascota, Dueno, Cita) y contratos IRepository
├── Veterinaria.Application/     # Casos de Uso: Lógica de negocio, DTOs, Mappings e IServices
├── Veterinaria.Infrastructure/  # Persistencia: AppDbContext, Repositories con MySQL y EF Core
└── Veterinaria.API/             # Presentación: Controllers REST, Middlewares, Swagger y Program.cs
```

---

## 📂 Estructura del Repositorio

```text
.
├── API/                 # Solución Backend (.NET 10)
│   ├── src/             # Capas de Clean Architecture
│   └── database/        # Scripts DDL de inicialización (init.sql)
├── client/              # Single Page Application (Angular + Tailwind)
├── mackups/             # Prototipos visuales y referencias de diseño
├── docker-compose.yml   # Orquestación de contenedores (API, DB y Client)
└── .env.example         # Plantilla de variables de entorno
```

---

## ⚙️ Requisitos Previos

- [Docker Desktop](https://www.docker.com/) instalado y en ejecución.
- *(Opcional para desarrollo local sin Docker)*:
  - [.NET 10 SDK](https://dotnet.microsoft.com/)
  - [Node.js (v20+)](https://nodejs.org/)
  - [MySQL Server 8.0](https://www.mysql.com/)

---

## 🛠️ Instalación y Puesta en Marcha con Docker

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Esthercita-Factory/MnaRin09-Veterinaria-los-chandosos.git](https://github.com/Esthercita-Factory/MnaRin09-Veterinaria-los-chandosos.git)
   cd MnaRin09-Veterinaria-los-chandosos
   ```

2. **Configurar variables de entorno:**
   Copia el archivo `.env.example` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```

3. **Levantar todos los servicios:**
   ```bash
   docker-compose up --build -d
   ```

4. **Acceso a los servicios:**
   - **Frontend (Angular Web):** `http://localhost:4200`
   - **Backend API (Swagger UI):** `http://localhost:5000/swagger`
   - **Base de Datos (MySQL):** `localhost:3306`

---

## 🗄️ Modelo de Datos Esencial

- **`Duenos`**: Registro e identificación de propietarios (Nombre, Teléfono, Email).
- **`Mascotas`**: Pacientes asociados a un propietario (Nombre, Especie, Raza, DuenoId).
- **`Citas`**: Control de agenda médica (Fecha, Motivo, Estado, MascotaId).

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
