using System;

namespace Quiz.API.Models
{
    public class TesterToRegister
    {
        public int? TesterId { get; set; }
        public int SchoolId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? TestDate { get; set; }
    }
}