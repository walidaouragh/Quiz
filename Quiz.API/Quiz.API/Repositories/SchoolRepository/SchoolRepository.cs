using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quiz.API.DbContext;
using Quiz.API.Models;

namespace Quiz.API.Repositories.SchoolRepository
{
    public class SchoolRepository: ISchoolRepository
    {
        private readonly QuizDbContext _dbContext;

        public SchoolRepository(QuizDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<School>> GetAllSchools()
        {
            return await _dbContext.Schools
                .Include(s => s.Quizzes)
                /*.ThenInclude(q => q.Questions)
                .ThenInclude(o => o.Options)
                .Include(e => e.Employees)
                .Include(t => t.Testers)*/
                .ToListAsync();
        }
    }
}