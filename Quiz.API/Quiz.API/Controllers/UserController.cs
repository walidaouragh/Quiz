using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Quiz.API.Models;
using Quiz.API.Repositories.User;

namespace Quiz.API.Controllers
{
    [Controller]
    [Route("api/user")]
    public class UserController: ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody]User userToRegister)
        {
            if (string.IsNullOrEmpty(userToRegister.Email) || string.IsNullOrEmpty(userToRegister.FirstName) || string.IsNullOrEmpty(userToRegister.LastName))
            {
                 return UnprocessableEntity($"You cannot Register with missing email or name ");
            }

            var emailExists = await _userRepository.GetUserByEmail(userToRegister.Email);
            if (emailExists != null)
            {
                return Conflict($"This email: {userToRegister.Email} already exists");
            }

            var mapper = _mapper.Map<User, UserToRegister>(userToRegister);
            var user = await _userRepository.RegisterUser(mapper);


            return Ok(user);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await _userRepository.GetUserById(userId);
            if (user == null)
            {
                return NotFound($"Could not find user with id: {userId}");
            }

            return Ok(user);
        }

        /*[HttpGet("{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetUserByEmail(email);
            if (user == null)
            {
                return NotFound($"Could not find user with email: {email}");
            }

            return Ok(user);
        }*/
    }
}