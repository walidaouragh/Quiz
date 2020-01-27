using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quiz.API.DbContext;
using Quiz.API.Models;

namespace Quiz.API.Repositories.TesterRepository
{

    public class TesterRepository : ITesterRepository
    {
        private readonly QuizDbContext _context;
        public TesterRepository(QuizDbContext context)
        {
            _context = context;
        }
        public async Task<Tester> RegisterTester(TesterToRegister testerToRegister)
        {
            var tester = new Tester
            {
                TesterId = testerToRegister.TesterId,
                SchoolId = testerToRegister.SchoolId,
                Email = testerToRegister.Email,
                FirstName = testerToRegister.FirstName,
                LastName = testerToRegister.LastName,
                TestDate = DateTime.Now
            };

            _context.Testers.Add(tester);
            await _context.SaveChangesAsync();

            return tester;
        }

        public async Task<Tester> GetTesterById(int schoolId, int TesterId)
        {
            var tester = await _context.Testers
                .Include(x => x.TesterAnswers)
                .Where(u => u.TesterId == TesterId && u.SchoolId == schoolId)
                .FirstOrDefaultAsync();
            return tester;
        }

        public async Task<List<Tester>> GetAllTesters(int schoolId)
        {
            var testers = await _context.Testers
                .Include(x => x.TesterAnswers)
                .Where(u => u.SchoolId == schoolId)
                .ToListAsync();
            return testers;
        }

        public async Task<Tester> GetTesterByEmail(string testerEmail)
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