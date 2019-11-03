using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quiz.API.DbContext;
using Quiz.API.Models;

namespace Quiz.API.Repositories
{
    public class QuizRepository : IQuizRepository
    {
        private readonly QuizDbContext _context;

        public QuizRepository(QuizDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task<List<Models.Quiz>> GetQuizzes()
        {
            return await _context.Quiz
                .Include(x => x.Questions)
                .ThenInclude(x => x.Options)
                .ToListAsync();
        }

        public async Task<Models.Quiz> GetQuiz(int id)
        {
            return await _context.Quiz
                .Include(x => x.Questions)
                .ThenInclude(x => x.Options)
                .Where(x => x.QuizId == id).FirstOrDefaultAsync();
        }

        /*public async Task<Options> PostAnswers(AnswerToPost answerToPost)
        {
            var answer = new Options
            {
                QuestionId = answerToPost.QuestionId,
               Options = answerToPost.Options,
               IsCorrect = answerToPost.IsCorrect
            };

            _context.Options.Add(answer);

            await _context.SaveChangesAsync();

            return answer;
        }*/
    }
}