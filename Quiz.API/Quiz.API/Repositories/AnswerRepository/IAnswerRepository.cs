using System.Linq;
using Quiz.API.Models;

namespace Quiz.API.Repositories.AnswerRepository
{
    public interface IAnswerRepository
    {
        IQueryable<Option> GetAnswersByQuestionId(int questionId);
    }
}