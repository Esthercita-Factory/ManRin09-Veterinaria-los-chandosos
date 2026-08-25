using System.ComponentModel.DataAnnotations;

namespace Veterinaria.Domain.Entities;

public class Dueno
{
    public int Id { get; set; }
    [MaxLength(100)]
    public string Nombre { get; set; } = string.Empty;
    [MaxLength(20)]
    public string DocumentoIdentificacion { get; set; } = string.Empty;
    [MaxLength(20)]
    public string Telefono { get; set; } = string.Empty;
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;
    [MaxLength(255)]
    public string PasswordHash { get; set; } = string.Empty;
    
    public ICollection<Veterinario> Veterinarios { get; set; } = new List<Veterinario>();

    public ICollection<Mascota> Mascotas { get; set; } = new List<Mascota>();
}
