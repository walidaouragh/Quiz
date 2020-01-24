using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quiz.API.DbContext;
using Quiz.API.Models;

namespace Quiz.API.Repositories.Tester
{

    public class TesterRepository : ITesterRepository
    {
        private readonly QuizDbContext _context;
        public TesterRepository(QuizDbContext context)
        {
            _context = context;
        }
        public async Task<Models.Tester> RegisterTester(TesterToRegister testerToRegister)
        {
            var tester = new Models.Tester
            {
                TesterId = testerToRegister.TesterId,
                Email = testerToRegister.Email,
                FirstName = testerToRegister.FirstName,
                LastName = testerToRegister.LastName
            };

            _context.Testers.Add(tester);
            await _context.SaveChangesAsync();

            return tester;
        }

        public async Task<Models.Tester> GetTesterById(int TesterId)
        {
            var tester = await _context.Testers
                .Include(x => x.TesterAnswers)
                .Where(u => u.TesterId == TesterId)
                .FirstOrDefaultAsync();
            return tester;
        }

        public async Task<List<Models.Tester>> GetAllTesters()
        {
            var testers = await _context.Testers
                .Include(x => x.TesterAnswers)
                .ToListAsync();
            return testers;
        }

        public async Task<Models.Tester> GetTesterByEmail(string testerEmail)
        {
            var tester = await _context.Testers
                .Where(u => u.Email == testerEmail)
                .FirstOrDefaultAsync();

            return tester;
        }

        public async Task DeleteTester(int testerId)
        {
            var tester = _context.Testers.Where(u => u.TesterId == testerId).Single();
            _context.Testers.Remove(tester);
            await _context.SaveChangesAsync();
        }
    }
}