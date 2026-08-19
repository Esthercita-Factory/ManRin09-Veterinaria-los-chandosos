using System.ComponentModel.DataAnnotations;

namespace Veterinaria.Application.DTOs
{
    public class RegistroDuenoDto
    {
        [Required(ErrorMessage = "El nombre es requerido.")]
        [StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres.")]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El documento de identificación es requerido.")]
        public string DocumentoIdentificacion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El correo electrónico es requerido.")]
        [EmailAddress(ErrorMessage = "El formato de correo electrónico no es válido.")]
        public string Email { get; set; } = string.Empty;

        [Phone(ErrorMessage = "El teléfono no tiene un formato válido.")]
        public string Telefono { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es requerida.")]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "La contraseña debe tener entre 8 y 20 caracteres.")]
        public string Password { get; set; } = string.Empty;
    }
}
