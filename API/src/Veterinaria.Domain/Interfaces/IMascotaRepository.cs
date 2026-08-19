using Veterinaria.Domain.Entities;

namespace Veterinaria.Domain.Interfaces;

public interface IMascotaRepository
{
    Task<IEnumerable<Mascota>> ObtenerTodasAsync();
    Task<IEnumerable<Mascota>> ObtenerPorDuenoIdAsync(int duenoId);
    Task<Mascota?> ObtenerPorIdAsync(int id);
    Task GuardarAsync(Mascota mascota);
    Task ActualizarAsync(Mascota mascota);
    Task EliminarAsync(Mascota mascota);
}
