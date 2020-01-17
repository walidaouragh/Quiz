using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Quiz.API.Models;

namespace Quiz.API.Repositories.AdminRepository
{
    public class AdminRepository: IAdminRepository
    {
        private const string AdminUserEmail = "walid@quiz.com";
        private const string AdminUserFirstName = "Walid";
        private const string AdminUserLastName = "Aouragh";
        private readonly UserManager<Admin> _userManager;
        private readonly SignInManager<Admin> _signInManager;
        private readonly IConfiguration _configuration;

        public AdminRepository(UserManager<Admin> userManager,  SignInManager<Admin> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        public async Task<IdentityResult> EnsureAdminUserExists()
        {
            /*To ensure Admin post this in postman*/
            /*{
                "AdminEmail": "walid@quiz.com",
                "AdminPassword": "P@ss0wrd!"
            }*/

            var user = new Admin()
            {
                Email = AdminUserEmail,
                UserName = AdminUserEmail,
                FirstName = AdminUserFirstName,
                LastName = AdminUserLastName,
                IsAdmin = true
            };

            var response = await _userManager.CreateAsync(user, "P@ss0wrd!");

            return response;;
        }


        public async Task<SignInResult> AuthenticateAdmin(string username, string password)
        {
            var admin = await _userManager.FindByEmailAsync(username);
            return admin == null ? null : await _signInManager.CheckPasswordSignInAsync(admin, password, false);
        }

        public Admin GetIdentityUserByEmail(string email)
        {
            return _userManager.Users.SingleOrDefault(r => r.Email == email);
        }

        public string GenerateJwtToken(Admin admin)
        {
            if (admin == null)
            {
                throw new ArgumentNullException(nameof(admin));
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString(CultureInfo.InvariantCulture)),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AuthConfig:development:secret")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration.GetValue<string>("AuthConfig:development:JwtIssuer"),
                _configuration.GetValue<string>("AuthConfig:development:JwtIssuer"),
                claims,
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}