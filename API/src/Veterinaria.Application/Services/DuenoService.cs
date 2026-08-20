using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Veterinaria.Application.DTOs;
using Veterinaria.Application.Interfaces;
using Veterinaria.Domain.Entities;
using Veterinaria.Domain.Interfaces;

namespace Veterinaria.Application.Services;

public class DuenoService : IDuenoService
{
    private readonly IDuenoRepository _duenoRepository;

    public DuenoService(IDuenoRepository duenoRepository)
    {
        _duenoRepository = duenoRepository;
    }

    public async Task<DuenoResponseDto> CrearAsync(CrearDuenoDto dto)
    {
        var email = dto.Email.Trim().ToLowerInvariant();

        var existente = await _duenoRepository.ObtenerPorEmailAsync(email);
        if (existente != null)
            throw new InvalidOperationException("El correo electrónico ya se encuentra registrado.");

        // Nombre provisional: prefijo del email con primera letra en mayúscula
        var nombreProvisional = char.ToUpper(email[0]) + email.Substring(1, email.IndexOf('@') - 1);

        // Contraseña temporal aleatoria segura (16 chars), el dueño la cambiará luego
        var tempPassword = Convert.ToBase64String(System.Security.Cryptography.RandomNumberGenerator.GetBytes(12));
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(tempPassword);

        var nuevoDueno = new Dueno
        {
            Nombre = nombreProvisional,
            Email = email,
            DocumentoIdentificacion = dto.DocumentoIdentificacion.Trim(),
            Telefono = string.Empty,
            PasswordHash = passwordHash
        };

        await _duenoRepository.GuardarAsync(nuevoDueno);

        return new DuenoResponseDto
        {
            Id = nuevoDueno.Id,
            Nombre = nuevoDueno.Nombre,
            Email = nuevoDueno.Email,
            DocumentoIdentificacion = nuevoDueno.DocumentoIdentificacion,
            Telefono = nuevoDueno.Telefono
        };
    }

    public async Task<IEnumerable<DuenoResponseDto>> ObtenerTodosAsync()
    {
        var duenos = await _duenoRepository.ObtenerTodosAsync();
        return duenos.Select(d => new DuenoResponseDto
        {
            Id = d.Id,
            Nombre = d.Nombre,
            DocumentoIdentificacion = d.DocumentoIdentificacion,
            Telefono = d.Telefono,
            Email = d.Email,
            Mascotas = d.Mascotas?.Select(m => new MascotaResponseDto 
            {
                Id = m.Id,
                Nombre = m.Nombre,
                Especie = m.Especie,
                Raza = m.Raza,
                HistorialMedico = m.HistorialMedico,
                DuenoId = m.DuenoId
            }) ?? new List<MascotaResponseDto>()
        });
    }

    public async Task<DuenoResponseDto?> ObtenerPorIdAsync(int id)
    {
        var d = await _duenoRepository.ObtenerPorIdAsync(id);
        if (d == null) return null;
        return new DuenoResponseDto
        {
            Id = d.Id,
            Nombre = d.Nombre,
            DocumentoIdentificacion = d.DocumentoIdentificacion,
            Telefono = d.Telefono,
            Email = d.Email,
            Mascotas = d.Mascotas?.Select(m => new MascotaResponseDto 
            {
                Id = m.Id,
                Nombre = m.Nombre,
                Especie = m.Especie,
                Raza = m.Raza,
                HistorialMedico = m.HistorialMedico,
                DuenoId = m.DuenoId
            }) ?? new List<MascotaResponseDto>()
        };
    }

    public async Task ActualizarAsync(int id, ActualizarDuenoDto dto)
    {
        var d = await _duenoRepository.ObtenerPorIdAsync(id);
        if (d == null) throw new InvalidOperationException("Dueño no encontrado.");
        
        d.Nombre = dto.Nombre;
        d.DocumentoIdentificacion = dto.DocumentoIdentificacion;
        d.Telefono = dto.Telefono;
        d.Email = dto.Email;
        
        await _duenoRepository.ActualizarAsync(d);
    }

    public async Task EliminarAsync(int id)
    {
        var d = await _duenoRepository.ObtenerPorIdAsync(id);
        if (d == null) throw new InvalidOperationException("Dueño no encontrado.");
        
        await _duenoRepository.EliminarAsync(d);
    }
}
