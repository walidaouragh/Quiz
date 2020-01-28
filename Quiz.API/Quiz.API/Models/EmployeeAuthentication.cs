using Microsoft.AspNetCore.Identity;

namespace Quiz.API.Models
{
    public class EmployeeAuthentication: IdentityUser<int>
    {
        public Employee Employee { get; set; }
    }
}