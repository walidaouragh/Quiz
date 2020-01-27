using System.Collections.Generic;
using System.Threading.Tasks;
using Quiz.API.Models;

namespace Quiz.API.Repositories.SchoolRepository
{
    public interface ISchoolRepository
    {
        Task<List<School>> GetAllSchools();
        Task<School> GetSchoolById(int schoolId);
    }
}