namespace Quiz.API.Models
{
    public class TesterAnswer
    {
        public int TesterId { get; set; }
        public int TesterAnswerId { get; set; }
        public string QuizName { get; set; }
        public string QuestionText { get; set; }
        public int QuestionId { get; set; }
        public string OptionText { get; set; }
        public bool IsCorrect { get; set; }
    }
}