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

        [HttpGet("{schoolId}")]
        public async Task<IActionResult> GetQuizzesBySchoolId(int schoolId)
        {
            var result = await  _quizRepository.GetQuizzes(schoolId);

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NoContent();
        }

        [HttpGet("{schoolId}/{quizId}")]
        public async Task<IActionResult> GetQuiz(int schoolId, int quizId)
        {
            var result = await  _quizRepository.GetQuiz(schoolId,quizId);
            if (result == null)
            {
                return NotFound($"Could not find quiz with id: {quizId}");
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddQuiz([FromBody] Models.Quiz quiz)
        {
            var quizExist = await  _quizRepository.GetQuizzes(quiz.SchoolId);

            if (quizExist != null && quizExist.Count > 0)
            {
                foreach (var name in quizExist)
                {
                    if (name != null && name.QuizName.ToLower() == quiz.QuizName.ToLower())
                    {
                        return Conflict($"A quiz with the name {quiz.QuizName} already exists");
                    }
                }
            }

            if (string.IsNullOrEmpty(quiz.QuizName))
            {
                return NotFound($"Quiz name is required");
            }

            var result = _quizRepository.AddQuiz(quiz);
            return Ok(result);
        }
    }
}