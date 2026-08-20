using System.ComponentModel.DataAnnotations;

namespace Veterinaria.Application.DTOs;

public class CrearDuenoDto
{
    [Required(ErrorMessage = "El correo electrónico es requerido.")]
    [EmailAddress(ErrorMessage = "El formato de correo no es válido.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "El número de identificación es requerido.")]
    public string DocumentoIdentificacion { get; set; } = string.Empty;
}
