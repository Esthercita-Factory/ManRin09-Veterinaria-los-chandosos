using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Veterinaria.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddVeterinarioIdToDueno : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VeterinarioId",
                table: "Duenos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Duenos_VeterinarioId",
                table: "Duenos",
                column: "VeterinarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Duenos_Veterinarios_VeterinarioId",
                table: "Duenos",
                column: "VeterinarioId",
                principalTable: "Veterinarios",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Duenos_Veterinarios_VeterinarioId",
                table: "Duenos");

            migrationBuilder.DropIndex(
                name: "IX_Duenos_VeterinarioId",
                table: "Duenos");

            migrationBuilder.DropColumn(
                name: "VeterinarioId",
                table: "Duenos");
        }
    }
}
