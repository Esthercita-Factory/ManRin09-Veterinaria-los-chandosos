using System.Threading.Tasks;
using Veterinaria.Application.DTOs;

namespace Veterinaria.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginDto dto);
        Task<AuthResponseDto> RegistrarDuenoAsync(RegistroDuenoDto dto);
        Task<AuthResponseDto> RegistrarVeterinarioAsync(RegistroVeterinarioDto dto);
    }
}
