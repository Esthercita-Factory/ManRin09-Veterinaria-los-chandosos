using System.ComponentModel.DataAnnotations;

namespace Veterinaria.Domain.Entities;

public class Cita
{
    public int Id { get; set; }
    public DateTime FechaHora { get; set; }
    [MaxLength(255)]
    public string Motivo { get; set; } = string.Empty;
    [MaxLength(50)]
    public string Estado { get; set; } = string.Empty;
    public int MascotaId { get; set; }
    public int VeterinarioId { get; set; } // The doctor handling this appointment
    
    public Mascota? Mascota { get; set; }
}
