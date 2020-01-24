using System.Collections.Generic;
using System.Threading.Tasks;
using Quiz.API.Models;

namespace Quiz.API.Repositories.Tester
{
    public interface ITesterRepository
    {
        Task<Models.Tester> RegisterTester(TesterToRegister testerToRegister);
        Task<Models.Tester> GetTesterById(int testerId);

        Task<List<Models.Tester>> GetAllTesters();

        Task<Models.Tester> GetTesterByEmail(string testerEmail);

        Task  DeleteTester(int testerId);
    }
}