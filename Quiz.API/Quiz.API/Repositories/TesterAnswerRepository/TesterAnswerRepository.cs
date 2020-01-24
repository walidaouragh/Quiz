using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quiz.API.DbContext;
using Quiz.API.Models;

namespace Quiz.API.Repositories.TesterAnswerRepository
{
    public class TesterAnswerRepository: ITesterAnswerRepository
    {
        private readonly QuizDbContext _context;

        public TesterAnswerRepository(QuizDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task<List<TesterAnswer>> TesterPostAnswers(List<AnswerToPost> answerToPost, int testerId, string quizName)
        {

            List<TesterAnswer> answers = new List<TesterAnswer>();

            foreach (var ans in answerToPost)
            {
                TesterAnswer result = new TesterAnswer();
                result.TesterId = testerId;
                result.QuizName = quizName;
                result.QuestionId = ans.QuestionId;
                result.QuestionText = ans.QuestionText;
                result.OptionText = ans.OptionText;
                result.IsCorrect = ans.IsCorrect;

                answers.Add(result);

                _context.TesterAnswers.Add(result);
            }
            await _context.SaveChangesAsync();

            return answers;
        }

        public IQueryable<TesterAnswer> GetTesterAnswersByQuestionId(int questionId, int testerId)
        {
            return _context.TesterAnswers
                .Where(q => q.QuestionId == questionId && q.TesterId == testerId);
        }
    }
}