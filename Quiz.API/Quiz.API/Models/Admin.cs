using Microsoft.AspNetCore.Identity;

namespace Quiz.API.Models
{
    public class Admin: IdentityUser
    {
        public int AdminId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public bool IsAdmin { get; set; }
    }
}