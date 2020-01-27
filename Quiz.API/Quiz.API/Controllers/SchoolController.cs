using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quiz.API.Repositories.SchoolRepository;

namespace Quiz.API.Controllers
{
    [Controller]
    [Route("api/school")]
    public class SchoolController: ControllerBase
    {
        private readonly ISchoolRepository _schoolRepository;

        public SchoolController(ISchoolRepository schoolRepository)
        {
            _schoolRepository = schoolRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSchools()
        {
            var schools = await _schoolRepository.GetAllSchools();
            if (schools != null && schools.Count > 0)
            {
                 return Ok(schools);
            }
            return NoContent();
        }

        [HttpGet("{schoolId}")]
        public async Task<IActionResult> GetSchoolById(int schoolId)
        {
            var school = await  _schoolRepository.GetSchoolById(schoolId);
            if (school == null)
            {
                return NotFound($"Could not find school with id: {schoolId}");
            }
            return Ok(school);
        }
    }
}