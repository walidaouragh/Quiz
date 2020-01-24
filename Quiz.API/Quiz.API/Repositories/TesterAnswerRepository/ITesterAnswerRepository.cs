using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quiz.API.Models;

namespace Quiz.API.Repositories.TesterAnswerRepository
{
    public interface ITesterAnswerRepository
    {
        Task<List<TesterAnswer>> TesterPostAnswers(List<AnswerToPost> answerToPost, int testerId, string quizName);

        IQueryable<TesterAnswer> GetTesterAnswersByQuestionId(int questionId, int testerId);
    }
}