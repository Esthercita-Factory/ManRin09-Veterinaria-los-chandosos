using System.ComponentModel.DataAnnotations;

namespace Veterinaria.Application.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage = "El correo electrónico es requerido.")]
        [EmailAddress(ErrorMessage = "El formato de correo electrónico no es válido.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es requerida.")]
        [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres.")]
        public string Password { get; set; } = string.Empty;
    }
}
