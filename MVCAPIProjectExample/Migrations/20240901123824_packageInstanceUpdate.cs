using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tafriAPI.Migrations
{
    /// <inheritdoc />
    public partial class packageInstanceUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PackageInstances_Users_UserId",
                table: "PackageInstances");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "PackageInstances",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_PackageInstances_Users_UserId",
                table: "PackageInstances",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PackageInstances_Users_UserId",
                table: "PackageInstances");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "PackageInstances",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PackageInstances_Users_UserId",
                table: "PackageInstances",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
