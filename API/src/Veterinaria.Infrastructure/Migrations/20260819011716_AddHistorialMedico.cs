using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Veterinaria.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddHistorialMedico : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HistorialMedico",
                table: "Mascotas",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HistorialMedico",
                table: "Mascotas");
        }
    }
}
