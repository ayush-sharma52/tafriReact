using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tafriAPI.Migrations
{
    /// <inheritdoc />
    public partial class userUpdated1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GstNumber",
                table: "Users",
                newName: "AccountNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AccountNumber",
                table: "Users",
                newName: "GstNumber");
        }
    }
}
