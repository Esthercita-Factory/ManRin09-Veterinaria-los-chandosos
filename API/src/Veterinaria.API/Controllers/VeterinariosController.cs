using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Veterinaria.Application.DTOs;
using Veterinaria.Domain.Interfaces;
using Veterinaria.Application.Interfaces;
using System.Security.Claims;

namespace Veterinaria.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VeterinariosController : ControllerBase
{
    private readonly IVeterinarioRepository _repo;
    private readonly IDuenoService _duenoService;

    public VeterinariosController(IVeterinarioRepository repo, IDuenoService duenoService)
    {
        _repo = repo;
        _duenoService = duenoService;
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

    [HttpGet("{veterinarioId}/clientes")]
    public async Task<IActionResult> ObtenerMisClientes(int veterinarioId)
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (currentUserId != veterinarioId.ToString())
            return Forbid();

        var clientes = await _duenoService.BuscarAsync(veterinarioId: veterinarioId);
        return Ok(clientes);
    }

    [HttpPost("{veterinarioId}/asociar-cliente/{duenoId}")]
    public async Task<IActionResult> AsociarCliente(int veterinarioId, int duenoId)
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (currentUserId != veterinarioId.ToString())
            return Forbid();

        try
        {
            await _duenoService.AsociarAVeterinariaAsync(duenoId, veterinarioId);
            return Ok();
        }
        catch (System.InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{veterinarioId}/asociar-cliente/{duenoId}")]
    public async Task<IActionResult> DesasociarCliente(int veterinarioId, int duenoId)
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (currentUserId != veterinarioId.ToString())
            return Forbid();

        try
        {
            await _duenoService.DesasociarDeVeterinariaAsync(duenoId, veterinarioId);
            return Ok();
        }
        catch (System.InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
