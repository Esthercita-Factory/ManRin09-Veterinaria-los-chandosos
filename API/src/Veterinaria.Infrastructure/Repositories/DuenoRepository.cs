using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Veterinaria.Domain.Entities;
using Veterinaria.Domain.Interfaces;
using Veterinaria.Infrastructure.Data;

namespace Veterinaria.Infrastructure.Repositories
{
    public class DuenoRepository : IDuenoRepository
    {
        private readonly AppDbContext _context;

        public DuenoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Dueno?> ObtenerPorEmailAsync(string email)
        {
            return await _context.Duenos
                .FirstOrDefaultAsync(d => d.Email.ToLower() == email.ToLower());
        }

        public async Task<Dueno?> ObtenerPorIdAsync(int id)
        {
            return await _context.Duenos.FindAsync(id);
        }

        public async Task<IEnumerable<Dueno>> ObtenerTodosAsync()
        {
            return await _context.Duenos.ToListAsync();
        }

        public async Task GuardarAsync(Dueno dueno)
        {
            await _context.Duenos.AddAsync(dueno);
            await _context.SaveChangesAsync();
        }

        public async Task ActualizarAsync(Dueno dueno)
        {
            _context.Duenos.Update(dueno);
            await _context.SaveChangesAsync();
        }

        public async Task EliminarAsync(Dueno dueno)
        {
            _context.Duenos.Remove(dueno);
            await _context.SaveChangesAsync();
        }
    }
}
