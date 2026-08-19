using System;

namespace Veterinaria.Application.DTOs
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Rol { get; set; } = string.Empty;
        public int UsuarioId { get; set; }
        public DateTime Expiracion { get; set; }
    }
}
