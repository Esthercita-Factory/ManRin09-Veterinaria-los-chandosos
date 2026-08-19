using System.Threading.Tasks;
using Veterinaria.Domain.Entities;

namespace Veterinaria.Domain.Interfaces
{
    public interface IVeterinarioRepository
    {
        Task<Veterinario?> ObtenerPorEmailAsync(string email);
        Task<Veterinario?> ObtenerPorIdAsync(int id);
        Task GuardarAsync(Veterinario veterinario);
    }
}
