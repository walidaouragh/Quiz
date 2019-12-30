using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quiz.API.DbContext;
using Quiz.API.Models;

namespace Quiz.API.Repositories.QuestionRepository
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly QuizDbContext _dbContext;

        public QuestionRepository(QuizDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Question>> GetQuestions(int quizId)
        {
            return await _dbContext.Questions
                .Include(o => o.Options)
                .Where(q => q.QuizId == quizId)
                .ToListAsync();
        }

        public async Task<Question> GetQuestion(int quizId, int questionId)
        {
            return await _dbContext.Questions
                .Include(o => o.Options)
                .Where(q => q.QuizId == quizId && q.QuestionId == questionId).FirstOrDefaultAsync();
        }


        public async Task AddQuestion(QuestionDto questionToPost, int quizId)
        {
            var questionToAdd = new Question()
            {
                QuizId = quizId,
                QuestionId = questionToPost.QuestionId,
                QuestionText = questionToPost.QuestionText,
                Options = questionToPost.Options
            };
            _dbContext.Questions.Add(questionToAdd);
            await _dbContext.SaveChangesAsync();
        }
        public async Task UpdateQuestion(QuestionDto questionDto, int quizId, int questionId)
        {
            var questionToUpdate = new Question()
            {
                QuizId = quizId,
                QuestionId = questionId,
                QuestionText = questionDto.QuestionText,
                Options = questionDto.Options
            };
            _dbContext.Questions.Update(questionToUpdate);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteQuestion(int quizId, int questionId)
        {
            var question = _dbContext.Questions.Where(x =>x.QuizId == quizId && x.QuestionId == questionId).Single();
            _dbContext.Questions.Remove(question);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Question> GetQuestionByQuestionText(int quizId, string questionText)
        {
            return await _dbContext.Questions
                .Where(q => q.QuizId == quizId && q.QuestionText == questionText).FirstOrDefaultAsync();
        }
    }
}