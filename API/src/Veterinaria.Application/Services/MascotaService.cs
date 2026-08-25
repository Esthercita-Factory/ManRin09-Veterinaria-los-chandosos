using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Veterinaria.Application.DTOs;
using Veterinaria.Application.Interfaces;
using Veterinaria.Domain.Entities;
using Veterinaria.Domain.Interfaces;

namespace Veterinaria.Application.Services;

public class MascotaService : IMascotaService
{
    private readonly IMascotaRepository _mascotaRepository;

    public MascotaService(IMascotaRepository mascotaRepository)
    {
        _mascotaRepository = mascotaRepository;
    }

    public async Task<IEnumerable<MascotaResponseDto>> ObtenerTodasAsync(int? veterinarioId = null)
    {
        var mascotas = await _mascotaRepository.ObtenerTodasAsync(veterinarioId);
        return mascotas.Select(MapToDto);
    }

    public async Task<IEnumerable<MascotaResponseDto>> ObtenerPorDuenoIdAsync(int duenoId)
    {
        var mascotas = await _mascotaRepository.ObtenerPorDuenoIdAsync(duenoId);
        return mascotas.Select(MapToDto);
    }

    public async Task<MascotaResponseDto?> ObtenerPorIdAsync(int id)
    {
        var m = await _mascotaRepository.ObtenerPorIdAsync(id);
        return m == null ? null : MapToDto(m);
    }

    public async Task<MascotaResponseDto> CrearAsync(CrearMascotaDto dto)
    {
        var mascota = new Mascota
        {
            Nombre = dto.Nombre,
            Especie = dto.Especie,
            Raza = dto.Raza,
            HistorialMedico = dto.HistorialMedico,
            DuenoId = dto.DuenoId
        };
        await _mascotaRepository.GuardarAsync(mascota);
        return MapToDto(mascota);
    }

    public async Task ActualizarAsync(int id, CrearMascotaDto dto)
    {
        var m = await _mascotaRepository.ObtenerPorIdAsync(id);
        if (m == null) throw new InvalidOperationException("Mascota no encontrada.");
        
        m.Nombre = dto.Nombre;
        m.Especie = dto.Especie;
        m.Raza = dto.Raza;
        m.HistorialMedico = dto.HistorialMedico;
        m.DuenoId = dto.DuenoId;
        
        await _mascotaRepository.ActualizarAsync(m);
    }

    public async Task EliminarAsync(int id)
    {
        var m = await _mascotaRepository.ObtenerPorIdAsync(id);
        if (m == null) throw new InvalidOperationException("Mascota no encontrada.");
        
        await _mascotaRepository.EliminarAsync(m);
    }

    private MascotaResponseDto MapToDto(Mascota m) => new MascotaResponseDto
    {
        Id = m.Id,
        Nombre = m.Nombre,
        Especie = m.Especie,
        Raza = m.Raza,
        HistorialMedico = m.HistorialMedico,
        NombreDueno = m.Dueno?.Nombre ?? string.Empty
    };
}
