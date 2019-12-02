using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Quiz.API.Models;

namespace Quiz.API.DbContext
{
    public class QuizDbContext : IdentityDbContext<Admin>
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options): base(options) { }
        public QuizDbContext() { }
        public DbSet<Models.Quiz> Quiz { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<UserAnswer> UserAnswers { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }
    }
}