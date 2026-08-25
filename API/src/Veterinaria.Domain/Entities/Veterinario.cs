using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Veterinaria.Domain.Entities
{
    public class Veterinario
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;
        [MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Especialidad { get; set; } = string.Empty;
        [MaxLength(50)]
        public string TarjetaProfesional { get; set; } = string.Empty;

        public ICollection<Dueno> Duenos { get; set; } = new List<Dueno>();
    }
}
