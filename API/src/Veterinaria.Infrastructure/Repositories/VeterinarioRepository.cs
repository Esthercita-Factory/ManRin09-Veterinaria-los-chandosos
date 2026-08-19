using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Veterinaria.Domain.Entities;
using Veterinaria.Domain.Interfaces;
using Veterinaria.Infrastructure.Data;

namespace Veterinaria.Infrastructure.Repositories
{
    public class VeterinarioRepository : IVeterinarioRepository
    {
        private readonly AppDbContext _context;

        public VeterinarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Veterinario?> ObtenerPorEmailAsync(string email)
        {
            return await _context.Veterinarios
                .FirstOrDefaultAsync(v => v.Email.ToLower() == email.ToLower());
        }

        public async Task<Veterinario?> ObtenerPorIdAsync(int id)
        {
            return await _context.Veterinarios.FindAsync(id);
        }

        public async Task GuardarAsync(Veterinario veterinario)
        {
            if (veterinario.Id == 0)
            {
                await _context.Veterinarios.AddAsync(veterinario);
            }
            else
            {
                _context.Veterinarios.Update(veterinario);
            }

            await _context.SaveChangesAsync();
        }
    }
}
