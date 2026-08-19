using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Veterinaria.Application.DTOs;
using Veterinaria.Domain.Interfaces;

namespace Veterinaria.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VeterinariosController : ControllerBase
{
    private readonly IVeterinarioRepository _repo;

    public VeterinariosController(IVeterinarioRepository repo)
    {
        _repo = repo;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] ActualizarVeterinarioDto dto)
    {
        var v = await _repo.ObtenerPorIdAsync(id);
        if (v == null) return NotFound();
        
        v.Nombre = dto.Nombre;
        v.Email = dto.Email;
        v.Especialidad = dto.Especialidad;
        v.TarjetaProfesional = dto.TarjetaProfesional;
        
        await _repo.GuardarAsync(v);
        return NoContent();
    }
}
