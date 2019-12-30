using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quiz.API.Models;
using Quiz.API.Repositories.QuestionRepository;

namespace Quiz.API.Controllers
{
    [Route("api/question")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _questionRepository;

        public QuestionController(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }

        [HttpGet("{quizId}")]
        public async Task<IActionResult> GetQuestions(int quizId)
        {
            var result = await  _questionRepository.GetQuestions(quizId);
            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NoContent();
        }

        [HttpGet("{quizId}/{questionId}")]
        public async Task<IActionResult> GetQuestion(int quizId, int questionId)
        {
            var result = await  _questionRepository.GetQuestion(quizId, questionId);
            if (result == null)
            {
                return NotFound($"Could not find quiz with id: {quizId} and question with id: {questionId}");
            }
            return Ok(result);
        }

        [HttpPost("add/{quizId}")]
        public async Task<IActionResult> AddQuestion([FromBody] QuestionDto questionDto, int quizId)
        {

            var questionExist = await  _questionRepository.GetQuestionByQuestionText(quizId, questionDto.QuestionText);
            if (questionExist != null)
            {
                return Conflict($"This question '{questionDto.QuestionText}' already exists");
            }

            if (string.IsNullOrEmpty(questionDto.QuestionText))
            {
                return NotFound($"Question is required");
            }

            if (questionDto.Options.FindAll(x => x.IsCorrect).Count < 1)
            {
                return NotFound($"At least one true answer is required");
            }

            if (questionDto.Options.FindAll(x => x.IsCorrect).Count > 1)
            {
                return NotFound($"Only need one true answer");
            }

            foreach (var opt in questionDto.Options)
            {
                if (string.IsNullOrEmpty(opt.OptionText))
                {
                    return NotFound($"All options are required");
                }
            }

            var result = _questionRepository.AddQuestion(questionDto, quizId);
            return Ok(result);
        }

        [HttpPut("edit/{quizId}/{questionId}")]
        public async Task<IActionResult> UpdateQuestion([FromBody] QuestionDto questionDto, int quizId, int questionId)
        {

            var questionExist = await  _questionRepository.GetQuestionByQuestionText(quizId, questionDto.QuestionText);
            if (questionExist != null)
            {
                return Conflict($"This question '{questionDto.QuestionText}' already exists");
            }

            if (string.IsNullOrEmpty(questionDto.QuestionText))
            {
                return NotFound($"Question is required");
            }

            if (questionDto.Options.FindAll(x => x.IsCorrect).Count < 1)
            {
                return NotFound($"At least one true answer is required");
            }

            if (questionDto.Options.FindAll(x => x.IsCorrect).Count > 1)
            {
                return NotFound($"Only need one true answer");
            }

            foreach (var opt in questionDto.Options)
            {
                if (string.IsNullOrEmpty(opt.OptionText))
                {
                    return NotFound($"All options are required");
                }
            }

            var result = _questionRepository.UpdateQuestion(questionDto, quizId, questionId);
            return Ok(result);
        }

        [HttpDelete("delete/{quizId}/{questionId}")]
        public IActionResult DeleteQuestion(int quizId, int questionId)
        {
            _questionRepository.DeleteQuestion(quizId, questionId);
            return NoContent();

        }
    }
}