using System.Threading.Tasks;
using Veterinaria.Domain.Entities;

namespace Veterinaria.Domain.Interfaces
{
    public interface IDuenoRepository
    {
        Task<Dueno?> ObtenerPorEmailAsync(string email);
        Task<Dueno?> ObtenerPorIdAsync(int id, int? veterinarioId = null);
        Task<IEnumerable<Dueno>> BuscarAsync(int? veterinarioId = null, string? email = null, string? documento = null);
        Task GuardarAsync(Dueno dueno);
        Task ActualizarAsync(Dueno dueno);
        Task EliminarAsync(Dueno dueno);
    }
}
