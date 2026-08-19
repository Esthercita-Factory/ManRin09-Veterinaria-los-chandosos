using System;

namespace Veterinaria.Domain.Entities
{
    public class Veterinario
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Especialidad { get; set; } = string.Empty;
        public string TarjetaProfesional { get; set; } = string.Empty;
    }
}
