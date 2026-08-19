using Veterinaria.Domain.Entities;

namespace Veterinaria.Domain.Interfaces;

public interface ICitaRepository
{
    Task<IEnumerable<Cita>> ObtenerTodasAsync();
    Task<Cita?> ObtenerPorIdAsync(int id);
    Task GuardarAsync(Cita cita);
    Task ActualizarAsync(Cita cita);
    Task EliminarAsync(Cita cita);
}
