using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Veterinaria.Application.DTOs;
using Veterinaria.Application.Interfaces;

namespace Veterinaria.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            try
            {
                var result = await _authService.LoginAsync(dto);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Ocurrió un error interno en el servidor." });
            }
        }

        [HttpPost("registro/dueno")]
        [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegistrarDueno([FromBody] RegistroDuenoDto dto)
        {
            try
            {
                var result = await _authService.RegistrarDuenoAsync(dto);
                return StatusCode(StatusCodes.Status201Created, result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Ocurrió un error interno en el servidor." });
            }
        }

        [HttpPost("registro/veterinario")]
        [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegistrarVeterinario([FromBody] RegistroVeterinarioDto dto)
        {
            try
            {
                var result = await _authService.RegistrarVeterinarioAsync(dto);
                return StatusCode(StatusCodes.Status201Created, result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Ocurrió un error interno en el servidor." });
            }
        }
    }
}
