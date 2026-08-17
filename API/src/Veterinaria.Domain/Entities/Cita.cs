namespace Veterinaria.Domain.Entities;

public class Cita
{
    public int Id { get; set; }
    public DateTime FechaHora { get; set; }
    public string Motivo { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;
    public int MascotaId { get; set; }
    
    public Mascota? Mascota { get; set; }
}
