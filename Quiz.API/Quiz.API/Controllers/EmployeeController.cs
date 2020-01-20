using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz.API.Models;
using Quiz.API.Repositories.EmployeeRepository;

namespace Quiz.API.Controllers
{
    [Controller]
    [Route("api/employee")]
    public class EmployeeController: ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpPost("ensure-admin")]
        public async Task<IActionResult> EnsureAdminUserExists()
        {
            var adminUser = await _employeeRepository.EnsureAdminUserExists();
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

        [HttpGet]
        public async Task<List<EmployeeToReturn>> GetAllEmployees()
        {
            List<Employee> employees = await _employeeRepository.GetAllEmployees().ToListAsync();
            List<EmployeeToReturn> results = employees.Where(e => e.Email != null && e.Email.Any()).Select(MapEmployeeToEmployeeResult).ToList();

            return results;
        }

        [HttpGet("{employeeId}")]
        public async Task<IActionResult> GetEmployeeById(int employeeId)
        {
            var result = await _employeeRepository.GetEmployeeById(employeeId);

            if (result == null)
            {
                return NotFound($"Could not find quiz with id: {employeeId}");
            }

            return Ok(MapEmployeeToEmployeeResult(result));
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetEmployeeByEmail(string email)
        {
            var result = await _employeeRepository.GetEmployeeByEmail(email);

            if (result == null)
            {
                return NotFound($"Could not find quiz with email: {email}");
            }

            return Ok(MapEmployeeToEmployeeResult(result));
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterEmployee([FromBody] EmployeeToRegister employeeToRegister)
        {
            var result =await _employeeRepository.RegisterEmployee(employeeToRegister);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginEmployee([FromBody]EmployeeToLogin employeeToLogin)
        {
            var response = await _employeeRepository.AuthenticateEmployee(employeeToLogin.EmployeeEmail, employeeToLogin.EmployeePassword);

            if (response == null || !response.Succeeded)
            {
                return Unauthorized("Employee not found or password is invalid");
            }

            var authResult = await MapToAuthorizationResult(employeeToLogin.EmployeeEmail);
            return Ok(authResult);
        }

        private async Task<EmployeeAuthorizationResult> MapToAuthorizationResult(string email)
        {
            var employee = await _employeeRepository.GetEmployeeByEmail(email);
            var authResult = new EmployeeAuthorizationResult()
            {
                Success = true,
                IsAdmin = employee.IsAdmin,
                DisplayName = $"{employee.FirstName} {employee.LastName}",
                EmployeeId = employee.Id,
                Token = _employeeRepository.GenerateJwtToken(employee),
            };
            return authResult;
        }

        private EmployeeToReturn MapEmployeeToEmployeeResult(Employee employee)
        {
            var employeeToReturn = new EmployeeToReturn()
            {
                EmployeeId = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                UserName = employee.UserName,
                Email = employee.Email,
                IsAdmin = employee.IsAdmin,
            };

            return employeeToReturn;
        }
    }
}