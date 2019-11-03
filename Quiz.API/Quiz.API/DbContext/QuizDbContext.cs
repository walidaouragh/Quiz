using Microsoft.EntityFrameworkCore;
using Quiz.API.Models;

namespace Quiz.API.DbContext
{
    public class QuizDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options): base(options) { }
        public QuizDbContext() { }
        public DbSet<Models.Quiz> Quiz { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<UserAnswer> UserAnswers { get; set; }

        public DbSet<User> Users { get; set; }
    }
}