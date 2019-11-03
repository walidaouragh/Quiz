using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quiz.API.DbContext;
using Quiz.API.Models;

namespace Quiz.API.Repositories.User
{

    public class UserRepository : IUserRepository
    {
        private readonly QuizDbContext _context;

        public UserRepository(QuizDbContext context)
        {
            _context = context;
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
                .Where(u => u.UserId == userId)
                .FirstOrDefaultAsync();
            return user;
        }

        public async Task<Models.User> GetUserByEmail(string userEmail)
        {
            var user = await _context.Users
                .Where(u => u.Email == userEmail)
                .FirstOrDefaultAsync();

            return user;
        }
    }
}