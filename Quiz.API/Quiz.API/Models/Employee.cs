using Microsoft.AspNetCore.Identity;

namespace Quiz.API.Models
{
    public class Employee: IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsAdmin { get; set; }
    }
}