using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz.API.Models;
using Quiz.API.Repositories.TesterAnswerRepository;


namespace Quiz.API.Controllers
{
    [Route("api/testerAnswer")]
    [ApiController]
    public class TesterAnswerController : ControllerBase
    {
        private readonly ITesterAnswerRepository _testerAnswerRepository;
        private readonly IMapper _mapper;

        public TesterAnswerController(ITesterAnswerRepository testerAnswerRepository, IMapper mapper)
        {
            _testerAnswerRepository = testerAnswerRepository;
            _mapper = mapper;
        }

        [HttpPost("{testerId}/{quizName}")]
        public async Task<IActionResult> PostAnswers([FromBody]List<Option> answer, int testerId, string quizName)
        {
            var mapper = _mapper.Map<List<Option>, List<AnswerToPost>>(answer);
            if (mapper.Contains(null))
            {
                return UnprocessableEntity($"All answers are required");
            }
            var result = await _testerAnswerRepository.TesterPostAnswers(mapper, testerId, quizName);

            return Ok(result);
        }

        [HttpGet("{testerId}/{questionId}")]
        public async Task<IActionResult> GetTesterAnswersByQuestionId(int questionId, int testerId)
        {
            var result = await _testerAnswerRepository.GetTesterAnswersByQuestionId(questionId, testerId).FirstOrDefaultAsync();

            if (result != null)
            {
                return Ok(result);
            }

            return NoContent();
        }
    }
}