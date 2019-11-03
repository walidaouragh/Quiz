using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz.API.Repositories.AnswerRepository;

namespace Quiz.API.Controllers
{
    [ApiController]
    [Route("api/answer")]
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerRepository _answerRepository;

        public AnswerController(IAnswerRepository answerRepository)
        {
            _answerRepository = answerRepository;
        }

        [HttpGet("{questionId}")]
        public async Task<IActionResult> GetAnswersByQuestionId(int questionId)
        {
            var result = await _answerRepository.GetAnswersByQuestionId(questionId).ToListAsync();

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NoContent();
        }
    }
}