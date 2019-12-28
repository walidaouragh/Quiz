using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Quiz.API.Models;

namespace Quiz.API.Repositories.User
{
    public interface IUserRepository
    {
        Task<Models.User> RegisterUser(UserToRegister userToRegister);
        Task<Models.User> GetUserById(int useId);

        Task<List<Models.User>> GetAllUsers();

        Task<Models.User> GetUserByEmail(string userEmail);

        Task<IdentityResult> EnsureAdminUserExists();
        Task<SignInResult> AuthenticateAdmin(string username, string password);

        Admin GetIdentityUserByEmail(string email);
        string GenerateJwtToken(Admin admin);

        Task  DeleteTester(int userId);
    }
}