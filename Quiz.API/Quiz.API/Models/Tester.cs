using System;
using System.Collections.Generic;

namespace Quiz.API.Models
{
    public class Tester
    {
        public int? TesterId { get; set; }
        public DateTime? TestDate { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int SchoolId { get; set; }
        public List<TesterAnswer> TesterAnswers { get; set; }
    }
}