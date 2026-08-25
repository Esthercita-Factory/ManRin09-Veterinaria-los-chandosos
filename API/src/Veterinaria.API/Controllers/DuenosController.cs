using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Veterinaria.Application.DTOs;
using Veterinaria.Application.Interfaces;
using System.Security.Claims;
using System.ComponentModel.DataAnnotations;

namespace Veterinaria.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DuenosController : ControllerBase
{
    private readonly IDuenoService _duenoService;

    public DuenosController(IDuenoService duenoService)
    {
        _duenoService = duenoService;
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
    public async Task<ActionResult<IEnumerable<DuenoResponseDto>>> Get(
        [FromQuery] [MaxLength(100)] [EmailAddress] string? email = null,
        [FromQuery] [MaxLength(20)] [RegularExpression(@"^[a-zA-Z0-9\-]*$")] string? documento = null)
    {
        var rol = User.FindFirst(ClaimTypes.Role)?.Value ?? User.FindFirst("rol")?.Value;

        // Si el usuario es dueño, solo devuelve su propio perfil (búsqueda por su propio ID)
        if (rol == "Dueno")
        {
            var userIdStr = User.FindFirst("usuarioId")?.Value;
            if (int.TryParse(userIdStr, out var duenoId))
            {
                var dueno = await _duenoService.ObtenerPorIdAsync(duenoId);
                return Ok(dueno != null ? new[] { dueno } : Array.Empty<DuenoResponseDto>());
            }
            return Ok(Array.Empty<DuenoResponseDto>());
        }

        // Para veterinarios: al menos un criterio de búsqueda es OBLIGATORIO
        if (string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(documento))
        {
            return BadRequest(new { message = "Debe proporcionar al menos un criterio de búsqueda: email o documento de identificación." });
        }

        // Búsqueda global: NO filtrar por veterinarioId.
        // El frontend usa el arreglo veterinarioIds para mostrar "Guardar" o "Eliminar".
        var duenos = await _duenoService.BuscarAsync(null, email, documento);
        
        return Ok(duenos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DuenoResponseDto>> Get(int id)
    {
        var veterinarioId = GetVeterinarioId();
        var dueno = await _duenoService.ObtenerPorIdAsync(id, veterinarioId);
        if (dueno == null) return NotFound();
        return Ok(dueno);
    }

    [HttpPost]
    public async Task<ActionResult<DuenoResponseDto>> Post([FromBody] CrearDuenoDto dto)
    {
        try
        {
            var veterinarioId = GetVeterinarioId();
            var result = await _duenoService.CrearAsync(dto, veterinarioId);
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] ActualizarDuenoDto dto)
    {
        var veterinarioId = GetVeterinarioId();
        await _duenoService.ActualizarAsync(id, dto, veterinarioId);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var veterinarioId = GetVeterinarioId();
        await _duenoService.EliminarAsync(id, veterinarioId);
        return NoContent();
    }
}
