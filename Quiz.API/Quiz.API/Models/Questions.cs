using System.Collections.Generic;

namespace Quiz.API.Models
{
    public class Question
    {
        public int QuestionId { get; set; }
        public int QuizId { get; set; }
        public string QuestionText { get; set; }
        public List<Option> Options { get; set; }
    }
}