using System.Collections.Generic;
using System.Threading.Tasks;
using Veterinaria.Application.DTOs;

namespace Veterinaria.Application.Interfaces;

public interface IMascotaService
{
    Task<IEnumerable<MascotaResponseDto>> ObtenerTodasAsync(int? veterinarioId = null);
    Task<IEnumerable<MascotaResponseDto>> ObtenerPorDuenoIdAsync(int duenoId);
    Task<MascotaResponseDto?> ObtenerPorIdAsync(int id);
    Task<MascotaResponseDto> CrearAsync(CrearMascotaDto dto);
    Task ActualizarAsync(int id, CrearMascotaDto dto);
    Task EliminarAsync(int id);
}
