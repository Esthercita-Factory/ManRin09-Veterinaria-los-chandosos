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

    public async Task<IEnumerable<DuenoResponseDto>> ObtenerTodosAsync()
    {
        var duenos = await _duenoRepository.ObtenerTodosAsync();
        return duenos.Select(d => new DuenoResponseDto
        {
            Id = d.Id,
            Nombre = d.Nombre,
            DocumentoIdentificacion = d.DocumentoIdentificacion,
            Telefono = d.Telefono,
            Email = d.Email
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
            Email = d.Email
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
