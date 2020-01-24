namespace Quiz.API.Models
{
    public class TesterToRegister
    {
        public int? TesterId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}