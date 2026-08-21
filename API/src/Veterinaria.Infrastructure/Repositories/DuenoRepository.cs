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

        public async Task<Dueno?> ObtenerPorIdAsync(int id, int? veterinarioId = null)
        {
            var query = _context.Duenos.Include(d => d.Mascotas).AsQueryable();
            if (veterinarioId.HasValue)
                query = query.Where(d => d.VeterinarioId == veterinarioId.Value || d.VeterinarioId == null);
                
            return await query.FirstOrDefaultAsync(d => d.Id == id);
        }

        /// <summary>
        /// Búsqueda puntual de dueños. Si no se proporciona al menos un criterio
        /// de búsqueda (email o documento), retorna una colección vacía.
        /// Jamás ejecuta un SELECT * sin filtros contra la tabla Duenos.
        /// </summary>
        public async Task<IEnumerable<Dueno>> BuscarAsync(int? veterinarioId = null, string? email = null, string? documento = null)
        {
            // GUARD: Sin criterios de búsqueda → colección vacía. No se toca la BD.
            if (string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(documento))
                return Enumerable.Empty<Dueno>();

            var query = _context.Duenos.Include(d => d.Mascotas).AsQueryable();

            // Scope de seguridad: solo dueños del veterinario o sin asignar
            if (veterinarioId.HasValue)
                query = query.Where(d => d.VeterinarioId == veterinarioId.Value || d.VeterinarioId == null);

            // Filtro estricto: coincidencia exacta por email O por documento
            var emailNorm = email?.Trim().ToLowerInvariant();
            var docNorm = documento?.Trim().ToLowerInvariant();

            if (!string.IsNullOrWhiteSpace(emailNorm) && !string.IsNullOrWhiteSpace(docNorm))
            {
                // Ambos criterios: OR lógico — encuentra al cliente por cualquiera de sus identificadores
                query = query.Where(d =>
                    d.Email.ToLower() == emailNorm ||
                    d.DocumentoIdentificacion.ToLower() == docNorm);
            }
            else if (!string.IsNullOrWhiteSpace(emailNorm))
            {
                query = query.Where(d => d.Email.ToLower() == emailNorm);
            }
            else // docNorm tiene valor (ya validamos arriba que al menos uno no es vacío)
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
