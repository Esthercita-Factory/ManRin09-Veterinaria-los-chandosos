namespace Veterinaria.Domain.Entities;

public class Dueno
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string DocumentoIdentificacion { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    
    public int? VeterinarioId { get; set; }
    public Veterinario? Veterinario { get; set; }

    public ICollection<Mascota> Mascotas { get; set; } = new List<Mascota>();
}
