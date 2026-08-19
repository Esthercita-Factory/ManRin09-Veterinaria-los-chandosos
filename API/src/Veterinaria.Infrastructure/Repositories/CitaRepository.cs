using Microsoft.EntityFrameworkCore;
using Veterinaria.Domain.Entities;
using Veterinaria.Domain.Interfaces;
using Veterinaria.Infrastructure.Data;

namespace Veterinaria.Infrastructure.Repositories;

public class CitaRepository : ICitaRepository
{
    private readonly AppDbContext _context;
    public CitaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Cita>> ObtenerTodasAsync()
    {
        return await _context.Citas.ToListAsync();
    }

    public async Task<Cita?> ObtenerPorIdAsync(int id)
    {
        return await _context.Citas.FindAsync(id);
    }

    public async Task GuardarAsync(Cita cita)
    {
        await _context.Citas.AddAsync(cita);
        await _context.SaveChangesAsync();
    }

    public async Task ActualizarAsync(Cita cita)
    {
        _context.Citas.Update(cita);
        await _context.SaveChangesAsync();
    }

    public async Task EliminarAsync(Cita cita)
    {
        _context.Citas.Remove(cita);
        await _context.SaveChangesAsync();
    }
}
