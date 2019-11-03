using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Quiz.API.Repositories;

namespace Quiz.API.Controllers
{
    [Route("api/quiz")]
    [ApiController]
    public class QuizController: ControllerBase
    {
        private readonly IQuizRepository _quizRepository;
        private readonly IMapper _mapper;

        public QuizController(IQuizRepository quizRepository, IMapper mapper)
        {
            _quizRepository = quizRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetQuizzes()
        {
            var result = await  _quizRepository.GetQuizzes();

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NoContent();
        }

        [HttpGet("{quizId}")]
        public async Task<IActionResult> GetQuiz(int quizId)
        {
            var result = await  _quizRepository.GetQuiz(quizId);
            if (result == null)
            {
                return NotFound($"Could not find quiz with id: {quizId}");
            }
            return Ok(result);
        }

        //For Admin only if he wants to add, update or delete quiz
        //For Admin only if he wants to add, update or delete questions and its options
    }
}