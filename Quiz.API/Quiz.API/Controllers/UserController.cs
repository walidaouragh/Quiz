using System.Linq;
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
                 return UnprocessableEntity($"Missing name or email");
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

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            if (users == null)
            {
                return NotFound($"Could not find users");
            }

            return Ok(users);
        }

        [HttpPost("admin/login")]
        public async Task<IActionResult> LoginAdmin([FromBody]AdminToLogin adminToLogin)
        {
            var response = await _userRepository.AuthenticateAdmin(adminToLogin.AdminEmail, adminToLogin.AdminPassword);

            if (response == null || !response.Succeeded)
            {
                return Unauthorized("Admin not found or password is invalid");
            }

            var authResult = await MapToAuthorizationResult(adminToLogin.AdminEmail);
            return Ok(authResult);
        }

        [HttpPost("ensure-admin")]
        public async Task<IActionResult> EnsureAdminUserExists()
        {
            var adminUser = await _userRepository.EnsureAdminUserExists();
            var result = new EnsureAdminResult()
            {
                Errors = adminUser.Errors.Select(e => e.Description).ToArray(),
                Succeeded = adminUser.Succeeded,
            };

            if (result.Succeeded)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete("{userId}")]
        public IActionResult DeleteTester(int userId)
        {
            _userRepository.DeleteTester(userId);
            return NoContent();

        }


        private async Task<AuthorizationResult> MapToAuthorizationResult(string email)
        {
            var appUser = _userRepository.GetIdentityUserByEmail(email);
            var authResult = new AuthorizationResult()
            {
                Success = true,
                IsAdmin = appUser.IsAdmin,
                DisplayName = $"{appUser.FirstName} {appUser.LastName}",
                AdminId = appUser.Id,
                Token = _userRepository.GenerateJwtToken(appUser),
            };
            return authResult;
        }
    }
}