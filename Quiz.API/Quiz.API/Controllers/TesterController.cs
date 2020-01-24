using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Quiz.API.Models;
using Quiz.API.Repositories.Tester;

namespace Quiz.API.Controllers
{
    [Controller]
    [Route("api/tester")]
    public class TesterController: ControllerBase
    {
        private readonly ITesterRepository _testerRepository;
        private readonly IMapper _mapper;

        public TesterController(ITesterRepository testerRepository, IMapper mapper)
        {
            _testerRepository = testerRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterTester([FromBody]Tester testerToRegister)
        {
            if (string.IsNullOrEmpty(testerToRegister.Email) || string.IsNullOrEmpty(testerToRegister.FirstName) || string.IsNullOrEmpty(testerToRegister.LastName))
            {
                 return UnprocessableEntity($"Missing name or email");
            }

            var emailExists = await _testerRepository.GetTesterByEmail(testerToRegister.Email);
            if (emailExists != null)
            {
                return Conflict($"This email: {testerToRegister.Email} already exists");
            }

            var mapper = _mapper.Map<Tester, TesterToRegister>(testerToRegister);
            var tester = await _testerRepository.RegisterTester(mapper);


            return Ok(tester);
        }

        [HttpGet("{testerId}")]
        public async Task<IActionResult> GetTesterById(int testerId)
        {
            var tester = await _testerRepository.GetTesterById(testerId);
            if (tester == null)
            {
                return NotFound($"Could not find tester with id: {testerId}");
            }

            return Ok(tester);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTesters()
        {
            var testers = await _testerRepository.GetAllTesters();
            if (testers == null)
            {
                return NotFound($"Could not find testers");
            }

            return Ok(testers);
        }

        [HttpDelete("{testerId}")]
        public IActionResult DeleteTester(int testerId)
        {
            _testerRepository.DeleteTester(testerId);
            return NoContent();

        }
    }
}