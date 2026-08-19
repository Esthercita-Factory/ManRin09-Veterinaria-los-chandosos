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
public class CitasController : ControllerBase
{
    private readonly ICitaService _citaService;

    public CitasController(ICitaService citaService)
    {
        _citaService = citaService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CitaResponseDto>>> Get()
    {
        return Ok(await _citaService.ObtenerTodasAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CitaResponseDto>> Get(int id)
    {
        var cita = await _citaService.ObtenerPorIdAsync(id);
        if (cita == null) return NotFound();
        return Ok(cita);
    }

    [HttpPost]
    public async Task<ActionResult<CitaResponseDto>> Post([FromBody] CrearCitaDto dto)
    {
        var result = await _citaService.CrearAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] CrearCitaDto dto)
    {
        await _citaService.ActualizarAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _citaService.EliminarAsync(id);
        return NoContent();
    }
}
