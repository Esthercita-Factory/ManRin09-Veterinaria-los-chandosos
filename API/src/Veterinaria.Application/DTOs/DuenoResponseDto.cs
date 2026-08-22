using System.Collections.Generic;

namespace Veterinaria.Application.DTOs;

public class DuenoResponseDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string DocumentoIdentificacion { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public List<int> VeterinarioIds { get; set; } = new List<int>();
    public IEnumerable<MascotaResponseDto> Mascotas { get; set; } = new List<MascotaResponseDto>();
}
