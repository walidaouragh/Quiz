using System.Collections.Generic;
using System.Threading.Tasks;
using Quiz.API.Models;

namespace Quiz.API.Repositories
{
    public interface IQuizRepository
    {
        Task<List<Models.Quiz>> GetQuizzes(int schoolId);

        Task<Models.Quiz> GetQuiz(int schoolId, int id);

        Task AddQuiz(Models.Quiz quiz);
    }
}