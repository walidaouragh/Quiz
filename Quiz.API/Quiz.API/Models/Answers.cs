namespace Quiz.API.Models
{
    public class Option
    {
        public int OptionId { get; set; }
        public int? TesterId { get; set; }
        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        public string OptionText { get; set; }
        public bool IsCorrect { get; set; }
    }
}