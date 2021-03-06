using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Quiz.API.Models;

namespace Quiz.API.Repositories.EmployeeRepository
{
    public interface IEmployeeRepository
    {
        Task<IdentityResult> RegisterEmployee(EmployeeToRegister employeeToRegister);

        Task<SignInResult> AuthenticateEmployee(string email, string password);

        Task<Employee> GetEmployeeByEmail(string email);

        string GenerateJwtToken(Employee employee);

        Task<Employee> GetEmployeeById(int schoolId, int employeeId);

        IQueryable<Employee> GetAllEmployees(int schoolId);

        Task<IdentityResult> EnsureAdminUserExists();

        Task SetEmployeeAdminStatus(int employeeId, bool isAdmin);
    }
}