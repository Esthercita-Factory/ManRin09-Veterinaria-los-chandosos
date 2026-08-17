namespace Veterinaria.Application.DTOs;

public class CrearCitaDto
{
    public DateTime FechaHora { get; set; }
    public string Motivo { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;
    public int MascotaId { get; set; }
}
