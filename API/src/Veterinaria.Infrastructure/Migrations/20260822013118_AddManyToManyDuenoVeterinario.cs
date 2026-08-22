using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Veterinaria.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddManyToManyDuenoVeterinario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "DuenoVeterinario",
                columns: table => new
                {
                    DuenosId = table.Column<int>(type: "int", nullable: false),
                    VeterinariosId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuenoVeterinario", x => new { x.DuenosId, x.VeterinariosId });
                    table.ForeignKey(
                        name: "FK_DuenoVeterinario_Duenos_DuenosId",
                        column: x => x.DuenosId,
                        principalTable: "Duenos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DuenoVeterinario_Veterinarios_VeterinariosId",
                        column: x => x.VeterinariosId,
                        principalTable: "Veterinarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_DuenoVeterinario_VeterinariosId",
                table: "DuenoVeterinario",
                column: "VeterinariosId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuenoVeterinario");

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
    }
}
