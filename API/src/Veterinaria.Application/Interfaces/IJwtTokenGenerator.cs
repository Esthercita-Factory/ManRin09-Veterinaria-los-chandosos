using System;

namespace Veterinaria.Application.Interfaces
{
    public interface IJwtTokenGenerator
    {
        (string Token, DateTime Expiracion) GenerateToken(int userId, string email, string nombre, string rol);
    }
}
