using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Veterinaria.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDocumentoIdentificacionToDueno : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DocumentoIdentificacion",
                table: "Duenos",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocumentoIdentificacion",
                table: "Duenos");
        }
    }
}
