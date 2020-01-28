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
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Quiz.API.Repositories.EmployeeRepository
{
    public class EmployeeRepository: IEmployeeRepository
    {
        private const string AdminUserEmail = "walid@quiz.com";
        private const string AdminUserFirstName = "Walid";
        private const string AdminUserLastName = "Aouragh";

        private readonly QuizDbContext _dbContext;
        private readonly UserManager<EmployeeAuthentication> _userManager;
        private readonly SignInManager<EmployeeAuthentication> _signInManager;
        private readonly IConfiguration _configuration;

        public EmployeeRepository(QuizDbContext dbContext, UserManager<EmployeeAuthentication> userManager, SignInManager<EmployeeAuthentication> signInManager, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }
        public async Task<IdentityResult> RegisterEmployee(EmployeeToRegister employeeToRegister)
        {
            var employee = new EmployeeAuthentication()
            {
                UserName = employeeToRegister.Email,
                Email = employeeToRegister.Email,

                Employee = new Employee()
                {
                    SchoolId = employeeToRegister.SchoolId,
                    FirstName = employeeToRegister.FirstName,
                    LastName = employeeToRegister.LastName,
                    Email = employeeToRegister.Email,
                    HireDate = DateTime.UtcNow,
                    IsAdmin = false,
                }
            };

           var response = await _userManager.CreateAsync(employee, employeeToRegister.Password);
           return response;
        }

        public IQueryable<Employee> GetAllEmployees(int schoolId)
        {
            return  _dbContext.Employees.Where(e =>e.SchoolId == schoolId);
        }

        public async Task<Employee> GetEmployeeById(int schoolId, int employeeId)
        {
            return await _dbContext.Employees.Where(r => r.EmployeeId == employeeId && r.SchoolId == schoolId).FirstOrDefaultAsync();
        }

        public async Task<Employee> GetEmployeeByEmail(string email)
        {
            return await _dbContext.Employees.Where(r => r.Email == email).FirstOrDefaultAsync();
        }

        public async Task<SignInResult> AuthenticateEmployee(string email, string password)
        {
            var employee = await _userManager.FindByNameAsync(email);
            return employee == null ? null : await _signInManager.CheckPasswordSignInAsync(employee, password, false);
        }

        public async Task<IdentityResult> EnsureAdminUserExists()
        {
            /*To ensure Admin post this in postman*/
            /*{
                "AdminEmail": "walid@quiz.com",
                "AdminPassword": "P@ss0wrd!"
            }*/

            var user = new EmployeeAuthentication()
            {
                Email = AdminUserEmail,
                UserName = AdminUserEmail,

                Employee = new Employee()
                {
                    SchoolId = null,
                    FirstName = AdminUserFirstName,
                    LastName = AdminUserLastName,
                    Email = AdminUserEmail,
                    HireDate = DateTime.UtcNow,
                    IsAdmin = true,
                }

            };


            var response = await _userManager.CreateAsync(user, "P@ss0wrd!");

            return response;;
        }

        public async Task SetEmployeeAdminStatus(int employeeId, bool isAdmin)
        {
            var employeeRecords = _dbContext.Employees.Where(p => p.EmployeeId == employeeId);
            foreach (var employee in employeeRecords)
            {
                employee.IsAdmin = isAdmin;
            }

            await _dbContext.SaveChangesAsync();
        }

        public string GenerateJwtToken(Employee employee)
        {
            if (employee == null)
            {
                throw new ArgumentNullException(nameof(employee));
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, employee.EmployeeId.ToString(CultureInfo.InvariantCulture)),
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