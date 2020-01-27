using System;
using System.Collections.Generic;

namespace Quiz.API.Models
{
    public class EmployeeAuthorizationResult
    {
        public int EmployeeId { get; set; }
        public int? schoolId { get; set; }
        public bool Success { get; set; }
        public bool IsAdmin { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public DateTime HireDate { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}