namespace Veterinaria.Application.DTOs;

public class MascotaResponseDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Especie { get; set; } = string.Empty;
    public string Raza { get; set; } = string.Empty;
    public string HistorialMedico { get; set; } = string.Empty;
    public int DuenoId { get; set; }
}
