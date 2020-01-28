using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Quiz.API.Models;

namespace Quiz.API.DbContext
{
    public class QuizDbContext : IdentityDbContext<EmployeeAuthentication, IdentityRole<int>, int>
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options): base(options) { }
        public QuizDbContext() { }
        public DbSet<Models.Quiz> Quiz { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<TesterAnswer> TesterAnswers { get; set; }

        public DbSet<Tester> Testers { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public DbSet<School> Schools { get; set; }

          protected override void OnModelCreating(ModelBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            base.OnModelCreating(builder);

            // This to override default AspNetUsers table name to be EmployeeAuthentication
            builder.Entity<EmployeeAuthentication>(
                entity => entity.ToTable(name: "EmployeeAuthentication"));
        }
    }
 }
