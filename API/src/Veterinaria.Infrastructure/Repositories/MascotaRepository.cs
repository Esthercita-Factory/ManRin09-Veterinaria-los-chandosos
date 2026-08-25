using Microsoft.EntityFrameworkCore;
using Veterinaria.Domain.Entities;
using Veterinaria.Domain.Interfaces;
using Veterinaria.Infrastructure.Data;

namespace Veterinaria.Infrastructure.Repositories;

public class MascotaRepository : IMascotaRepository
{
    private readonly AppDbContext _context;
    public MascotaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Mascota>> ObtenerTodasAsync(int? veterinarioId = null)
    {
        var query = _context.Mascotas.Include(m => m.Dueno).AsQueryable();
        if (veterinarioId.HasValue)
        {
            query = query.Where(m => m.Dueno != null && m.Dueno.Veterinarios.Any(v => v.Id == veterinarioId.Value));
        }
        return await query.ToListAsync();
    }

    public async Task<IEnumerable<Mascota>> ObtenerPorDuenoIdAsync(int duenoId)
    {
        return await _context.Mascotas.Include(m => m.Dueno).Where(m => m.DuenoId == duenoId).ToListAsync();
    }

    public async Task<Mascota?> ObtenerPorIdAsync(int id)
    {
        return await _context.Mascotas.Include(m => m.Dueno).FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task GuardarAsync(Mascota mascota)
    {
        await _context.Mascotas.AddAsync(mascota);
        await _context.SaveChangesAsync();
    }

    public async Task ActualizarAsync(Mascota mascota)
    {
        _context.Mascotas.Update(mascota);
        await _context.SaveChangesAsync();
    }

    public async Task EliminarAsync(Mascota mascota)
    {
        _context.Mascotas.Remove(mascota);
        await _context.SaveChangesAsync();
    }
}
