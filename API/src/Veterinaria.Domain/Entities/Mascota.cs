using System.ComponentModel.DataAnnotations;

namespace Veterinaria.Domain.Entities;

public class Mascota
{
    public int Id { get; set; }
    [MaxLength(100)]
    public string Nombre { get; set; } = string.Empty;
    [MaxLength(50)]
    public string Especie { get; set; } = string.Empty;
    [MaxLength(50)]
    public string Raza { get; set; } = string.Empty;
    public string HistorialMedico { get; set; } = string.Empty;
    public int DuenoId { get; set; }
    
    public Dueno? Dueno { get; set; }
    public ICollection<Cita> Citas { get; set; } = new List<Cita>();
}
