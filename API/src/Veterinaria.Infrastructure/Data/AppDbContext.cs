using Microsoft.EntityFrameworkCore;
using Veterinaria.Domain.Entities;

namespace Veterinaria.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Dueno> Duenos { get; set; }
    public DbSet<Mascota> Mascotas { get; set; }
    public DbSet<Cita> Citas { get; set; }
}
