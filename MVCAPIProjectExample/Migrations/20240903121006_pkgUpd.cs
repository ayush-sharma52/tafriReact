using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tafriAPI.Migrations
{
    /// <inheritdoc />
    public partial class pkgUpd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsPublic",
                table: "Packages",
                newName: "Released");

            migrationBuilder.AddColumn<int>(
                name: "Available",
                table: "Packages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "FinalPrice",
                table: "Packages",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Available",
                table: "Packages");

            migrationBuilder.DropColumn(
                name: "FinalPrice",
                table: "Packages");

            migrationBuilder.RenameColumn(
                name: "Released",
                table: "Packages",
                newName: "IsPublic");
        }
    }
}
