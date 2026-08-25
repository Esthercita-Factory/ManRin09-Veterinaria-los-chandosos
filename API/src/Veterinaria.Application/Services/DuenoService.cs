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
    private readonly IVeterinarioRepository _veterinarioRepository;

    public DuenoService(IDuenoRepository duenoRepository, IVeterinarioRepository veterinarioRepository)
    {
        _duenoRepository = duenoRepository;
        _veterinarioRepository = veterinarioRepository;
    }

    public async Task<DuenoResponseDto> CrearAsync(CrearDuenoDto dto, int? veterinarioId = null)
    {
        var email = dto.Email.Trim().ToLowerInvariant();

        var existente = await _duenoRepository.ObtenerPorEmailAsync(email);
        if (existente != null)
            throw new InvalidOperationException("El correo electrónico ya se encuentra registrado.");

        var nombreProvisional = char.ToUpper(email[0]) + email.Substring(1, email.IndexOf('@') - 1);
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
        
        if (veterinarioId.HasValue)
        {
            var vet = await _veterinarioRepository.ObtenerPorIdAsync(veterinarioId.Value);
            if (vet != null)
            {
                nuevoDueno.Veterinarios.Add(vet);
            }
        }

        await _duenoRepository.GuardarAsync(nuevoDueno);

        return new DuenoResponseDto
        {
            Id = nuevoDueno.Id,
            Nombre = nuevoDueno.Nombre,
            Email = nuevoDueno.Email,
            VeterinarioIds = nuevoDueno.Veterinarios.Select(v => v.Id).ToList(),
            DocumentoIdentificacion = nuevoDueno.DocumentoIdentificacion,
            Telefono = nuevoDueno.Telefono
        };
    }

    public async Task<IEnumerable<DuenoResponseDto>> BuscarAsync(int? veterinarioId = null, string? email = null, string? documento = null)
    {
        var duenos = await _duenoRepository.BuscarAsync(veterinarioId, email, documento);
        return duenos.Select(d => new DuenoResponseDto
        {
            Id = d.Id,
            Nombre = d.Nombre,
            DocumentoIdentificacion = d.DocumentoIdentificacion,
            Telefono = d.Telefono,
            Email = d.Email,
            VeterinarioIds = d.Veterinarios.Select(v => v.Id).ToList(),
            Mascotas = d.Mascotas?.Select(m => new MascotaResponseDto 
            {
                Id = m.Id,
                Nombre = m.Nombre,
                Especie = m.Especie,
                Raza = m.Raza,
                HistorialMedico = m.HistorialMedico,
                NombreDueno = d.Nombre
            }) ?? new List<MascotaResponseDto>()
        });
    }

    public async Task<DuenoResponseDto?> ObtenerPorIdAsync(int id, int? veterinarioId = null)
    {
        var d = await _duenoRepository.ObtenerPorIdAsync(id, veterinarioId);
        if (d == null) return null;
        return new DuenoResponseDto
        {
            Id = d.Id,
            Nombre = d.Nombre,
            DocumentoIdentificacion = d.DocumentoIdentificacion,
            Telefono = d.Telefono,
            Email = d.Email,
            VeterinarioIds = d.Veterinarios.Select(v => v.Id).ToList(),
            Mascotas = d.Mascotas?.Select(m => new MascotaResponseDto 
            {
                Id = m.Id,
                Nombre = m.Nombre,
                Especie = m.Especie,
                Raza = m.Raza,
                HistorialMedico = m.HistorialMedico,
                NombreDueno = d.Nombre
            }) ?? new List<MascotaResponseDto>()
        };
    }

    public async Task ActualizarAsync(int id, ActualizarDuenoDto dto, int? veterinarioId = null)
    {
        var d = await _duenoRepository.ObtenerPorIdAsync(id, veterinarioId);
        if (d == null) throw new InvalidOperationException("Dueño no encontrado.");
        
        d.Nombre = dto.Nombre;
        d.DocumentoIdentificacion = dto.DocumentoIdentificacion;
        d.Telefono = dto.Telefono;
        d.Email = dto.Email;
        
        await _duenoRepository.ActualizarAsync(d);
    }

    public async Task EliminarAsync(int id, int? veterinarioId = null)
    {
        var d = await _duenoRepository.ObtenerPorIdAsync(id, veterinarioId);
        if (d == null) throw new InvalidOperationException("Dueño no encontrado.");
        
        await _duenoRepository.EliminarAsync(d);
    }

    public async Task AsociarAVeterinariaAsync(int clienteId, int veterinarioId)
    {
        var d = await _duenoRepository.ObtenerPorIdAsync(clienteId);
        if (d == null) throw new InvalidOperationException("Dueño no encontrado.");
        
        if (d.Veterinarios.Any(v => v.Id == veterinarioId)) 
            throw new InvalidOperationException("El cliente ya está asociado a esta veterinaria.");
            
        var vet = await _veterinarioRepository.ObtenerPorIdAsync(veterinarioId);
        if (vet == null) throw new InvalidOperationException("Veterinario no encontrado.");
        
        d.Veterinarios.Add(vet);
        await _duenoRepository.ActualizarAsync(d);
    }

    public async Task DesasociarDeVeterinariaAsync(int clienteId, int veterinarioId)
    {
        var d = await _duenoRepository.ObtenerPorIdAsync(clienteId);
        if (d == null) throw new InvalidOperationException("Dueño no encontrado.");
        
        var vet = d.Veterinarios.FirstOrDefault(v => v.Id == veterinarioId);
        if (vet == null) throw new InvalidOperationException("El cliente no está asociado a esta veterinaria.");
        
        d.Veterinarios.Remove(vet);
        await _duenoRepository.ActualizarAsync(d);
    }
}
