using System.Collections.Generic;
using System.Threading.Tasks;
using Quiz.API.Models;

namespace Quiz.API.Repositories.TesterRepository
{
    public interface ITesterRepository
    {
        Task<Tester> RegisterTester(TesterToRegister testerToRegister);
        Task<Tester> GetTesterById(int schoolId, int testerId);

        Task<List<Tester>> GetAllTesters(int schoolId);

        Task<Tester> GetTesterByEmail(string testerEmail);

        Task  DeleteTester(int testerId);
    }
}