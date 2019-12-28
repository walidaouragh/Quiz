using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quiz.API.DbContext;
using Quiz.API.Models;

namespace Quiz.API.Repositories.UserAnswerRepository
{
    public class UserAnswerRepository: IUserAnswerRepository
    {
        private readonly QuizDbContext _context;

        public UserAnswerRepository(QuizDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task<List<UserAnswer>> UserPostAnswers(List<AnswerToPost> answerToPost, int userId)
        {

            List<UserAnswer> answers = new List<UserAnswer>();

            foreach (var ans in answerToPost)
            {
                UserAnswer result = new UserAnswer();
                result.UserId = userId;
                result.QuestionId = ans.QuestionId;
                result.QuestionText = ans.QuestionText;
                result.OptionText = ans.OptionText;
                result.IsCorrect = ans.IsCorrect;

                answers.Add(result);

                _context.UserAnswers.Add(result);
            }
            await _context.SaveChangesAsync();

            return answers;
        }

        public IQueryable<UserAnswer> GetUserAnswersByQuestionId(int questionId, int userId)
        {
            return _context.UserAnswers
                .Where(q => q.QuestionId == questionId && q.UserId == userId);
        }
    }
}