using System.Collections.Generic;
using System.Threading.Tasks;
using Veterinaria.Application.DTOs;

namespace Veterinaria.Application.Interfaces;

public interface ICitaService
{
    Task<IEnumerable<CitaResponseDto>> ObtenerTodasAsync();
    Task<CitaResponseDto?> ObtenerPorIdAsync(int id);
    Task<CitaResponseDto> CrearAsync(CrearCitaDto dto);
    Task ActualizarAsync(int id, CrearCitaDto dto);
    Task EliminarAsync(int id);
}
