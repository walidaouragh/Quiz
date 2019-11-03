using System.Collections.Generic;
using System.Linq;
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

        [HttpPost]
        public async Task<IActionResult> PostAnswers([FromBody]List<Option> answer)
        {
            var mapper = _mapper.Map<List<Option>, List<AnswerToPost>>(answer);
            var result = await _userAnswerRepository.UserPostAnswers(mapper);

            if (result == null || result.Count == 0)
            {
                return UnprocessableEntity($"You cannot submit an empty answer");
            }

            return Ok(result);
        }

        [HttpGet("{userId}/{questionId}")]
        public async Task<IActionResult> GetUserAnswersByQuestionId(int questionId, int userId)
        {
            var result = await _userAnswerRepository.GetUserAnswersByQuestionId(questionId, userId).ToListAsync();

            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }

            return NoContent();
        }
    }
}