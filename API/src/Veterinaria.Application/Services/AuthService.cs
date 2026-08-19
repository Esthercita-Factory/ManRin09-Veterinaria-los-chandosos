using System;
using System.Threading.Tasks;
using BCrypt.Net;
using Veterinaria.Application.DTOs;
using Veterinaria.Application.Interfaces;
using Veterinaria.Domain.Entities;
using Veterinaria.Domain.Interfaces;

namespace Veterinaria.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IVeterinarioRepository _veterinarioRepository;
        private readonly IDuenoRepository _duenoRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public AuthService(
            IVeterinarioRepository veterinarioRepository,
            IDuenoRepository duenoRepository,
            IJwtTokenGenerator jwtTokenGenerator)
        {
            _veterinarioRepository = veterinarioRepository;
            _duenoRepository = duenoRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var email = dto.Email.Trim().ToLowerInvariant();

            // 1. Buscar en Veterinarios
            var veterinario = await _veterinarioRepository.ObtenerPorEmailAsync(email);
            if (veterinario != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(dto.Password, veterinario.PasswordHash))
                {
                    throw new UnauthorizedAccessException("Credenciales inválidas");
                }

                var (token, expiracion) = _jwtTokenGenerator.GenerateToken(
                    veterinario.Id,
                    veterinario.Email,
                    veterinario.Nombre,
                    "Veterinario"
                );

                return new AuthResponseDto
                {
                    Token = token,
                    Email = veterinario.Email,
                    Nombre = veterinario.Nombre,
                    Rol = "Veterinario",
                    UsuarioId = veterinario.Id,
                    Expiracion = expiracion
                };
            }

            // 2. Buscar en Dueños
            var dueno = await _duenoRepository.ObtenerPorEmailAsync(email);
            if (dueno != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(dto.Password, dueno.PasswordHash))
                {
                    throw new UnauthorizedAccessException("Credenciales inválidas");
                }

                var (token, expiracion) = _jwtTokenGenerator.GenerateToken(
                    dueno.Id,
                    dueno.Email,
                    dueno.Nombre,
                    "Dueno"
                );

                return new AuthResponseDto
                {
                    Token = token,
                    Email = dueno.Email,
                    Nombre = dueno.Nombre,
                    Rol = "Dueno",
                    UsuarioId = dueno.Id,
                    Expiracion = expiracion
                };
            }

            // 3. Mitigación de Enumeración de Usuarios
            throw new UnauthorizedAccessException("Credenciales inválidas");
        }

        public async Task<AuthResponseDto> RegistrarDuenoAsync(RegistroDuenoDto dto)
        {
            var email = dto.Email.Trim().ToLowerInvariant();

            var duenoExistente = await _duenoRepository.ObtenerPorEmailAsync(email);
            var vetExistente = await _veterinarioRepository.ObtenerPorEmailAsync(email);

            if (duenoExistente != null || vetExistente != null)
            {
                throw new InvalidOperationException("El correo electrónico ya se encuentra registrado.");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var nuevoDueno = new Dueno
            {
                Nombre = dto.Nombre.Trim(),
                DocumentoIdentificacion = dto.DocumentoIdentificacion.Trim(),
                Email = email,
                Telefono = dto.Telefono.Trim(),
                PasswordHash = passwordHash
            };

            await _duenoRepository.GuardarAsync(nuevoDueno);

            var (token, expiracion) = _jwtTokenGenerator.GenerateToken(
                nuevoDueno.Id,
                nuevoDueno.Email,
                nuevoDueno.Nombre,
                "Dueno"
            );

            return new AuthResponseDto
            {
                Token = token,
                Email = nuevoDueno.Email,
                Nombre = nuevoDueno.Nombre,
                Rol = "Dueno",
                UsuarioId = nuevoDueno.Id,
                Expiracion = expiracion
            };
        }

        public async Task<AuthResponseDto> RegistrarVeterinarioAsync(RegistroVeterinarioDto dto)
        {
            var email = dto.Email.Trim().ToLowerInvariant();

            var vetExistente = await _veterinarioRepository.ObtenerPorEmailAsync(email);
            var duenoExistente = await _duenoRepository.ObtenerPorEmailAsync(email);

            if (vetExistente != null || duenoExistente != null)
            {
                throw new InvalidOperationException("El correo electrónico ya se encuentra registrado.");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var nuevoVeterinario = new Veterinario
            {
                Nombre = dto.Nombre.Trim(),
                Email = email,
                Especialidad = dto.Especialidad.Trim(),
                TarjetaProfesional = dto.TarjetaProfesional.Trim(),
                PasswordHash = passwordHash
            };

            await _veterinarioRepository.GuardarAsync(nuevoVeterinario);

            var (token, expiracion) = _jwtTokenGenerator.GenerateToken(
                nuevoVeterinario.Id,
                nuevoVeterinario.Email,
                nuevoVeterinario.Nombre,
                "Veterinario"
            );

            return new AuthResponseDto
            {
                Token = token,
                Email = nuevoVeterinario.Email,
                Nombre = nuevoVeterinario.Nombre,
                Rol = "Veterinario",
                UsuarioId = nuevoVeterinario.Id,
                Expiracion = expiracion
            };
        }
    }
}
