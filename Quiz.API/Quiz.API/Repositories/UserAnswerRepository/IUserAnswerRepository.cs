using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quiz.API.Models;

namespace Quiz.API.Repositories.UserAnswerRepository
{
    public interface IUserAnswerRepository
    {
        Task<List<UserAnswer>> UserPostAnswers(List<AnswerToPost> answerToPost);

        IQueryable<UserAnswer> GetUserAnswersByQuestionId(int questionId, int userId);
    }
}