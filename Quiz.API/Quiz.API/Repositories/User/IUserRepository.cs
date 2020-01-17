using System.Collections.Generic;
using System.Threading.Tasks;
using Quiz.API.Models;

namespace Quiz.API.Repositories.User
{
    public interface IUserRepository
    {
        Task<Models.User> RegisterUser(UserToRegister userToRegister);
        Task<Models.User> GetUserById(int useId);

        Task<List<Models.User>> GetAllUsers();

        Task<Models.User> GetUserByEmail(string userEmail);

        Task  DeleteTester(int userId);
    }
}