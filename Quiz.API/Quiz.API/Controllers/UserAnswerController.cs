using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz.API.Models;
using Quiz.API.Repositories.User;
using Quiz.API.Repositories.UserAnswerRepository;

namespace Quiz.API.Controllers
{
    [Route("api/userAnswer")]
    [ApiController]
    public class UserAnswerController : ControllerBase
    {
        private readonly IUserAnswerRepository _userAnswerRepository;
        private readonly IMapper _mapper;

        public UserAnswerController(IUserAnswerRepository userAnswerRepository, IMapper mapper, IUserRepository userRepository)
        {
            _userAnswerRepository = userAnswerRepository;
            _mapper = mapper;
        }

        [HttpPost("{userId}/{quizName}")]
        public async Task<IActionResult> PostAnswers([FromBody]List<Option> answer, int userId, string quizName)
        {
            var mapper = _mapper.Map<List<Option>, List<AnswerToPost>>(answer);
            if (mapper.Contains(null))
            {
                return UnprocessableEntity($"All answers are required");
            }
            var result = await _userAnswerRepository.UserPostAnswers(mapper, userId, quizName);

            return Ok(result);
        }

        [HttpGet("{userId}/{questionId}")]
        public async Task<IActionResult> GetUserAnswersByQuestionId(int questionId, int userId)
        {
            var result = await _userAnswerRepository.GetUserAnswersByQuestionId(questionId, userId).FirstOrDefaultAsync();

            if (result != null)
            {
                return Ok(result);
            }

            return NoContent();
        }
    }
}