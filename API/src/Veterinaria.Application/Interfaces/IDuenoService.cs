using System.Collections.Generic;
using System.Threading.Tasks;
using Veterinaria.Application.DTOs;

namespace Veterinaria.Application.Interfaces;

public interface IDuenoService
{
    Task<IEnumerable<DuenoResponseDto>> ObtenerTodosAsync();
    Task<DuenoResponseDto?> ObtenerPorIdAsync(int id);
    Task ActualizarAsync(int id, ActualizarDuenoDto dto);
    Task EliminarAsync(int id);
}
