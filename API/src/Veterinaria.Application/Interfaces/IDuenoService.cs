using System.Collections.Generic;
using System.Threading.Tasks;
using Veterinaria.Application.DTOs;

namespace Veterinaria.Application.Interfaces;

public interface IDuenoService
{
    Task<IEnumerable<DuenoResponseDto>> BuscarAsync(int? veterinarioId = null, string? email = null, string? documento = null);
    Task<DuenoResponseDto?> ObtenerPorIdAsync(int id, int? veterinarioId = null);
    Task<DuenoResponseDto> CrearAsync(CrearDuenoDto dto, int? veterinarioId = null);
    Task ActualizarAsync(int id, ActualizarDuenoDto dto, int? veterinarioId = null);
    Task EliminarAsync(int id, int? veterinarioId = null);
    Task AsociarAVeterinariaAsync(int clienteId, int veterinarioId);
    Task DesasociarDeVeterinariaAsync(int clienteId, int veterinarioId);
}
