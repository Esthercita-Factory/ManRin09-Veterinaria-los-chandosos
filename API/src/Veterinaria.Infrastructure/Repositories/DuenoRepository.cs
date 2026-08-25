using System;
using System.Collections.Generic;
using System.Linq;
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
                .Include(d => d.Veterinarios)
                .FirstOrDefaultAsync(d => d.Email.ToLower() == email.ToLower());
        }

        public async Task<Dueno?> ObtenerPorIdAsync(int id, int? veterinarioId = null)
        {
            var query = _context.Duenos
                .Include(d => d.Mascotas)
                .Include(d => d.Veterinarios)
                .AsQueryable();
                
            if (veterinarioId.HasValue)
                query = query.Where(d => d.Veterinarios.Any(v => v.Id == veterinarioId.Value) || !d.Veterinarios.Any());
                
            return await query.FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<IEnumerable<Dueno>> BuscarAsync(int? veterinarioId = null, string? email = null, string? documento = null)
        {
            if (veterinarioId == null && string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(documento))
                return Enumerable.Empty<Dueno>();

            var query = _context.Duenos
                .Include(d => d.Mascotas)
                .Include(d => d.Veterinarios)
                .AsQueryable();

            if (veterinarioId.HasValue)
                query = query.Where(d => d.Veterinarios.Any(v => v.Id == veterinarioId.Value)); // Get ONLY the vet's clients if searching for mis clientes

            var emailNorm = email?.Trim().ToLowerInvariant();
            var docNorm = documento?.Trim().ToLowerInvariant();

            if (!string.IsNullOrWhiteSpace(emailNorm) && !string.IsNullOrWhiteSpace(docNorm))
            {
                query = query.Where(d => d.Email.ToLower() == emailNorm || d.DocumentoIdentificacion.ToLower() == docNorm);
            }
            else if (!string.IsNullOrWhiteSpace(emailNorm))
            {
                query = query.Where(d => d.Email.ToLower() == emailNorm);
            }
            else if (!string.IsNullOrWhiteSpace(docNorm))
            {
                query = query.Where(d => d.DocumentoIdentificacion.ToLower() == docNorm);
            }

            return await query.ToListAsync();
        }

        public async Task GuardarAsync(Dueno dueno)
        {
            await _context.Duenos.AddAsync(dueno);
            await _context.SaveChangesAsync();
        }

        public async Task ActualizarAsync(Dueno dueno)
        {
            // El ChangeTracker de EF Core ya está rastreando la entidad y sus colecciones.
            // Llamar a Update() puede interferir con las operaciones en colecciones Many-to-Many.
            await _context.SaveChangesAsync();
        }

        public async Task EliminarAsync(Dueno dueno)
        {
            _context.Duenos.Remove(dueno);
            await _context.SaveChangesAsync();
        }
    }
}
