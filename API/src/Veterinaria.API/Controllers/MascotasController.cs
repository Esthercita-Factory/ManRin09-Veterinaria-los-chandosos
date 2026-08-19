using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Veterinaria.Application.DTOs;
using Veterinaria.Application.Interfaces;

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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MascotaResponseDto>>> Get()
    {
        return Ok(await _mascotaService.ObtenerTodasAsync());
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
