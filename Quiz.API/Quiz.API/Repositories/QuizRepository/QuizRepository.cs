using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quiz.API.DbContext;

namespace Quiz.API.Repositories
{
    public class QuizRepository : IQuizRepository
    {
        private readonly QuizDbContext _context;

        public QuizRepository(QuizDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task<List<Models.Quiz>> GetQuizzes(int schoolId)
        {
            return await _context.Quiz
                .Where(x => x.SchoolId == schoolId)
                .Include(x => x.Questions)
                .ThenInclude(x => x.Options)
                .ToListAsync();
        }

        public async Task<Models.Quiz> GetQuiz(int schoolId, int id)
        {
            return await _context.Quiz
                .Include(x => x.Questions)
                .ThenInclude(x => x.Options)
                .Where(x => x.SchoolId == schoolId && x.QuizId == id).FirstOrDefaultAsync();
        }

        public async Task AddQuiz(Models.Quiz quiz)
        {
            var quizToAdd = new Models.Quiz()
            {
               QuizName = quiz.QuizName,
               SchoolId = quiz.SchoolId
            };
            _context.Quiz.Add(quizToAdd);
            await _context.SaveChangesAsync();
        }
    }
}