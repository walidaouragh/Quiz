using Microsoft.EntityFrameworkCore.Migrations;

namespace Quiz.API.Migrations
{
    public partial class quizNameToUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuizName",
                table: "UserAnswers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuizName",
                table: "UserAnswers");
        }
    }
}
