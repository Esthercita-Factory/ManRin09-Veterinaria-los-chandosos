namespace Veterinaria.Domain.Entities;

public class Dueno
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    
    public ICollection<Mascota> Mascotas { get; set; } = new List<Mascota>();
}
