-- =============================================================================
--  Veterinaria Los Chandosos — Esquema de Base de Datos
--  Generado desde las entidades C# (.NET 10) y migraciones de Entity Framework
--  Motor: MySQL 8.0+ | Charset: utf8mb4
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `veterinaria_db`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `veterinaria_db`;

-- -----------------------------------------------------------------------------
-- Tabla: Duenos
-- Entidad: Veterinaria.Domain.Entities.Dueno
-- Migraciones: InitialCreate + AddDocumentoIdentificacionToDueno
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Duenos` (
    `Id`                      INT            NOT NULL AUTO_INCREMENT,
    `Nombre`                  LONGTEXT       NOT NULL,   -- string  → LONGTEXT (convención EF/MySQL)
    `DocumentoIdentificacion` LONGTEXT       NOT NULL,   -- añadido en migración AddDocumentoIdentificacionToDueno
    `Telefono`                LONGTEXT       NOT NULL,
    `Email`                   LONGTEXT       NOT NULL,
    `PasswordHash`            LONGTEXT       NOT NULL,   -- BCrypt hash almacenado como texto
    `VeterinarioId`           INT            NULL,       -- FK → Veterinarios.Id (nullable, auto-registrados = NULL)
    CONSTRAINT `PK_Duenos` PRIMARY KEY (`Id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Índice para búsquedas frecuentes por email (login/registro)
CREATE INDEX IF NOT EXISTS `IX_Duenos_Email` ON `Duenos` (`Email`(255));

-- -----------------------------------------------------------------------------
-- Tabla: Veterinarios
-- Entidad: Veterinaria.Domain.Entities.Veterinario
-- Migración: InitialCreate
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Veterinarios` (
    `Id`                  INT      NOT NULL AUTO_INCREMENT,
    `Nombre`              LONGTEXT NOT NULL,
    `Email`               LONGTEXT NOT NULL,
    `PasswordHash`        LONGTEXT NOT NULL,   -- BCrypt hash
    `Especialidad`        LONGTEXT NOT NULL,
    `TarjetaProfesional`  LONGTEXT NOT NULL,
    CONSTRAINT `PK_Veterinarios` PRIMARY KEY (`Id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Índice para búsquedas por email (login/registro)
CREATE INDEX IF NOT EXISTS `IX_Veterinarios_Email` ON `Veterinarios` (`Email`(255));

-- FK y índice para Duenos.VeterinarioId (se agrega aquí porque Veterinarios debe existir primero)
CREATE INDEX IF NOT EXISTS `IX_Duenos_VeterinarioId` ON `Duenos` (`VeterinarioId`);
ALTER TABLE `Duenos`
    ADD CONSTRAINT `FK_Duenos_Veterinarios_VeterinarioId`
    FOREIGN KEY (`VeterinarioId`) REFERENCES `Veterinarios` (`Id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

-- -----------------------------------------------------------------------------
-- Tabla: Mascotas
-- Entidad: Veterinaria.Domain.Entities.Mascota
-- Migraciones: InitialCreate + AddHistorialMedico
-- Relación: Mascota N→1 Dueno  (FK con CASCADE DELETE)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Mascotas` (
    `Id`                INT      NOT NULL AUTO_INCREMENT,
    `Nombre`            LONGTEXT NOT NULL,
    `Especie`           LONGTEXT NOT NULL,
    `Raza`              LONGTEXT NOT NULL,
    `HistorialMedico`   LONGTEXT NOT NULL,   -- añadido en migración AddHistorialMedico
    `DuenoId`           INT      NOT NULL,   -- FK → Duenos.Id
    CONSTRAINT `PK_Mascotas`            PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Mascotas_Duenos_DuenoId`
        FOREIGN KEY (`DuenoId`)
        REFERENCES `Duenos` (`Id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Índice generado automáticamente por EF Core para la FK
CREATE INDEX IF NOT EXISTS `IX_Mascotas_DuenoId` ON `Mascotas` (`DuenoId`);

-- -----------------------------------------------------------------------------
-- Tabla: Citas
-- Entidad: Veterinaria.Domain.Entities.Cita
-- Migraciones: InitialCreate + AddVeterinarioIdToCita
-- Relaciones:
--   Cita N→1 Mascota     (FK con CASCADE DELETE)
--   Cita N→1 Veterinario (FK con RESTRICT — no se borra el vet si tiene citas)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Citas` (
    `Id`            INT           NOT NULL AUTO_INCREMENT,
    `FechaHora`     DATETIME(6)   NOT NULL,   -- DateTime C# → DATETIME(6) con microsegundos
    `Motivo`        LONGTEXT      NOT NULL,
    `Estado`        LONGTEXT      NOT NULL,   -- Valores: 'Pendiente','Confirmada','Completada','Cancelada'
    `MascotaId`     INT           NOT NULL,   -- FK → Mascotas.Id
    `VeterinarioId` INT           NOT NULL,   -- FK → Veterinarios.Id (añadido en AddVeterinarioIdToCita)
    CONSTRAINT `PK_Citas` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Citas_Mascotas_MascotaId`
        FOREIGN KEY (`MascotaId`)
        REFERENCES `Mascotas` (`Id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `FK_Citas_Veterinarios_VeterinarioId`
        FOREIGN KEY (`VeterinarioId`)
        REFERENCES `Veterinarios` (`Id`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Índices generados por EF Core para las FKs
CREATE INDEX IF NOT EXISTS `IX_Citas_MascotaId`     ON `Citas` (`MascotaId`);
CREATE INDEX IF NOT EXISTS `IX_Citas_VeterinarioId` ON `Citas` (`VeterinarioId`);

-- -----------------------------------------------------------------------------
-- Tabla: __EFMigrationsHistory
-- Requerida por Entity Framework Core para rastrear migraciones aplicadas.
-- Incluirla permite que EF no re-aplique migraciones si se usa dotnet ef.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId`    VARCHAR(150) NOT NULL,
    `ProductVersion` VARCHAR(32)  NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- Inyectar un Dueño / Cliente
INSERT INTO `Duenos` (`Nombre`, `Telefono`, `Email`, `PasswordHash`, `DocumentoIdentificacion`)
VALUES (
  'Carlos Perez',
  '3001234567',
  'cliente@test.com',
  'test.123', 
  '123456789'
);

-- Inyectar un Veterinario
INSERT INTO `Veterinarios` (`Nombre`, `Email`, `PasswordHash`, `Especialidad`, `TarjetaProfesional`)
VALUES (
  'Dra. Maria Gomez',
  'vet@test.com',
  'test.123',
  'Cirugía y Medicina General',
  'TP-98765-CO'
);