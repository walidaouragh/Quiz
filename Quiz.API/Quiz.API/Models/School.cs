using System.Collections.Generic;

namespace Quiz.API.Models
{
    public class School
    {
        public int SchoolId { get; set; }
        public string SchoolName { get; set; }
        public string Location { get; set; }
        public List<Quiz> Quizzes { get; set; }
        public List<Employee> Employees { get; set; }
        public List<Tester> Testers { get; set; }
    }
}