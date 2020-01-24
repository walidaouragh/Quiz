using System.Linq;
using Quiz.API.DbContext;
using Quiz.API.Models;

namespace Quiz.API.Repositories.AnswerRepository
{
    public class AnswerRepository :IAnswerRepository
    {
        private readonly QuizDbContext _context;

        public AnswerRepository(QuizDbContext context)
        {
            _context = context;
        }
        public IQueryable<Option> GetAnswersByQuestionId(int questionId)
        {
            return _context.Options
                .Where(q => q.QuestionId == questionId);
        }
    }
}