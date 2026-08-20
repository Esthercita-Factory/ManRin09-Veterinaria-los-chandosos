using System;
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
public class DuenosController : ControllerBase
{
    private readonly IDuenoService _duenoService;

    public DuenosController(IDuenoService duenoService)
    {
        _duenoService = duenoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DuenoResponseDto>>> Get()
    {
        return Ok(await _duenoService.ObtenerTodosAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DuenoResponseDto>> Get(int id)
    {
        var dueno = await _duenoService.ObtenerPorIdAsync(id);
        if (dueno == null) return NotFound();
        return Ok(dueno);
    }

    [HttpPost]
    public async Task<ActionResult<DuenoResponseDto>> Post([FromBody] CrearDuenoDto dto)
    {
        try
        {
            var result = await _duenoService.CrearAsync(dto);
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
        await _duenoService.ActualizarAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _duenoService.EliminarAsync(id);
        return NoContent();
    }
}
