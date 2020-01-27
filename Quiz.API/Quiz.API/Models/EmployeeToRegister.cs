using System;

namespace Quiz.API.Models
{
    public class EmployeeToRegister
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? SchoolId { get; set; }
        public DateTime? HireDate { get; set; }
    }
}