using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Quiz.API.Models;

namespace Quiz.API.Repositories.AdminRepository
{
    public interface IAdminRepository
    {
        Task<IdentityResult> EnsureAdminUserExists();
        Task<SignInResult> AuthenticateAdmin(string username, string password);

        Admin GetIdentityUserByEmail(string email);
        string GenerateJwtToken(Admin admin);
    }
}