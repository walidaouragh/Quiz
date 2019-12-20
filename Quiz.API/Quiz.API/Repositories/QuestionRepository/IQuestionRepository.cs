using System.Collections.Generic;
using System.Threading.Tasks;
using Quiz.API.Models;

namespace Quiz.API.Repositories.QuestionRepository
{
    public interface IQuestionRepository
    {
        Task<List<Question>> GetQuestions(int quizId);
        Task<Question> GetQuestion(int quizId, int questionId);
        Task UpdateQuestion(QuestionDto questionDto, int quizId, int questionId);
        Task AddQuestion(QuestionDto questionDto, int quizId);
        Task  DeleteQuestion(int quizId, int questionId);
    }
}