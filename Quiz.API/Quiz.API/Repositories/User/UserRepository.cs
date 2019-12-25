using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Quiz.API.DbContext;
using Quiz.API.Models;

namespace Quiz.API.Repositories.User
{

    public class UserRepository : IUserRepository
    {
        private const string AdminUserEmail = "walid@quiz.com";
        private const string AdminUserFirstName = "Walid";
        private const string AdminUserLastName = "Aouragh";
        private readonly QuizDbContext _context;
        private readonly UserManager<Admin> _userManager;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<Admin> _signInManager;

        public UserRepository(QuizDbContext context, UserManager<Admin> userManager, IConfiguration configuration,  SignInManager<Admin> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
            _signInManager = signInManager;
        }
        public async Task<Models.User> RegisterUser(UserToRegister userToRegister)
        {
            var user = new Models.User
            {
                UserId = userToRegister.UserId,
                Email = userToRegister.Email,
                FirstName = userToRegister.FirstName,
                LastName = userToRegister.LastName
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<Models.User> GetUserById(int userId)
        {
            var user = await _context.Users
                .Include(x => x.UserAnswers)
                .Where(u => u.UserId == userId)
                .FirstOrDefaultAsync();
            return user;
        }

        public async Task<List<Models.User>> GetAllUsers()
        {
            var users = await _context.Users
                .Include(x => x.UserAnswers)
                .ToListAsync();
            return users;
        }

        public async Task<Models.User> GetUserByEmail(string userEmail)
        {
            var user = await _context.Users
                .Where(u => u.Email == userEmail)
                .FirstOrDefaultAsync();

            return user;
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