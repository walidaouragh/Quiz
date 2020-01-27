using System.Collections.Generic;

namespace Quiz.API.Models
{
    public class Quiz
    {
        public int SchoolId { get; set; }
        public int QuizId { get; set; }
        public string QuizName { get; set; }
        public List<Question> Questions { get; set; }
    }
}