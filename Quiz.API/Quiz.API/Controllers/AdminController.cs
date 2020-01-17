using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quiz.API.Models;
using Quiz.API.Repositories.AdminRepository;

namespace Quiz.API.Controllers
{
    [Controller]
    [Route("api/admin")]
    public class AdminController: ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAdmin([FromBody]AdminToLogin adminToLogin)
        {
            var response = await _adminRepository.AuthenticateAdmin(adminToLogin.AdminEmail, adminToLogin.AdminPassword);

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
            var adminUser = await _adminRepository.EnsureAdminUserExists();
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

        private async Task<AuthorizationResult> MapToAuthorizationResult(string email)
        {
            var appUser = _adminRepository.GetIdentityUserByEmail(email);
            var authResult = new AuthorizationResult()
            {
                Success = true,
                IsAdmin = appUser.IsAdmin,
                DisplayName = $"{appUser.FirstName} {appUser.LastName}",
                AdminId = appUser.Id,
                Token = _adminRepository.GenerateJwtToken(appUser),
            };
            return authResult;
        }
    }

}