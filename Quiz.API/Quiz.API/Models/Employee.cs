using System;

namespace Quiz.API.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public int? SchoolId { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string LastName { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime HireDate { get; set; }
    }
}