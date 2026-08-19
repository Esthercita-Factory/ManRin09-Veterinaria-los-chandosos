using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Veterinaria.Application.DTOs;
using Veterinaria.Application.Interfaces;
using Veterinaria.Domain.Entities;
using Veterinaria.Domain.Interfaces;

namespace Veterinaria.Application.Services;

public class CitaService : ICitaService
{
    private readonly ICitaRepository _citaRepository;

    public CitaService(ICitaRepository citaRepository)
    {
        _citaRepository = citaRepository;
    }

    public async Task<IEnumerable<CitaResponseDto>> ObtenerTodasAsync()
    {
        var citas = await _citaRepository.ObtenerTodasAsync();
        return citas.Select(MapToDto);
    }

    public async Task<CitaResponseDto?> ObtenerPorIdAsync(int id)
    {
        var c = await _citaRepository.ObtenerPorIdAsync(id);
        return c == null ? null : MapToDto(c);
    }

    public async Task<CitaResponseDto> CrearAsync(CrearCitaDto dto)
    {
        var cita = new Cita
        {
            FechaHora = dto.FechaHora,
            Motivo = dto.Motivo,
            Estado = dto.Estado,
            MascotaId = dto.MascotaId,
            VeterinarioId = dto.VeterinarioId
        };
        await _citaRepository.GuardarAsync(cita);
        return MapToDto(cita);
    }

    public async Task ActualizarAsync(int id, CrearCitaDto dto)
    {
        var c = await _citaRepository.ObtenerPorIdAsync(id);
        if (c == null) throw new InvalidOperationException("Cita no encontrada.");
        
        c.FechaHora = dto.FechaHora;
        c.Motivo = dto.Motivo;
        c.Estado = dto.Estado;
        c.MascotaId = dto.MascotaId;
        c.VeterinarioId = dto.VeterinarioId;
        
        await _citaRepository.ActualizarAsync(c);
    }

    public async Task EliminarAsync(int id)
    {
        var c = await _citaRepository.ObtenerPorIdAsync(id);
        if (c == null) throw new InvalidOperationException("Cita no encontrada.");
        
        await _citaRepository.EliminarAsync(c);
    }

    private CitaResponseDto MapToDto(Cita c) => new CitaResponseDto
    {
        Id = c.Id,
        FechaHora = c.FechaHora,
        Motivo = c.Motivo,
        Estado = c.Estado,
        MascotaId = c.MascotaId,
        VeterinarioId = c.VeterinarioId
    };
}
