using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Quiz.API.Models;

namespace Quiz.API.DbContext
{
    public class QuizDbContext : IdentityDbContext<Employee, IdentityRole<int>, int>
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options): base(options) { }
        public QuizDbContext() { }
        public DbSet<Models.Quiz> Quiz { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<UserAnswer> UserAnswers { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }

          protected override void OnModelCreating(ModelBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            base.OnModelCreating(builder);

            // This to override default AspNetUsers table name to be Employees
            builder.Entity<Employee>(
                entity => entity.ToTable(name: "Employees"));
        }
    }
 }
