using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Veterinaria.Application.DTOs;
using Veterinaria.Application.Interfaces;

using System.Security.Claims;

namespace Veterinaria.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MascotasController : ControllerBase
{
    private readonly IMascotaService _mascotaService;

    public MascotasController(IMascotaService mascotaService)
    {
        _mascotaService = mascotaService;
    }

    private int? GetVeterinarioId()
    {
        var rol = User.FindFirst(ClaimTypes.Role)?.Value ?? User.FindFirst("rol")?.Value;
        if (rol == "Veterinario")
        {
            var userIdStr = User.FindFirst("usuarioId")?.Value ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdStr, out var userId))
                return userId;
        }
        return null;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MascotaResponseDto>>> Get()
    {
        var veterinarioId = GetVeterinarioId();
        return Ok(await _mascotaService.ObtenerTodasAsync(veterinarioId));
    }

    [HttpGet("dueno/{duenoId}")]
    public async Task<ActionResult<IEnumerable<MascotaResponseDto>>> GetByDueno(int duenoId)
    {
        return Ok(await _mascotaService.ObtenerPorDuenoIdAsync(duenoId));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MascotaResponseDto>> Get(int id)
    {
        var mascota = await _mascotaService.ObtenerPorIdAsync(id);
        if (mascota == null) return NotFound();
        return Ok(mascota);
    }

    [HttpPost]
    public async Task<ActionResult<MascotaResponseDto>> Post([FromBody] CrearMascotaDto dto)
    {
        var result = await _mascotaService.CrearAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] CrearMascotaDto dto)
    {
        await _mascotaService.ActualizarAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _mascotaService.EliminarAsync(id);
        return NoContent();
    }
}
