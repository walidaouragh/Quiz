namespace Quiz.API.Models
{
    public class AnswerToPost
    {
        public int TesterId { get; set; }
        public int QuizId { get; set; }
        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        public string OptionText { get; set; }
        public bool IsCorrect { get; set; }
    }
}