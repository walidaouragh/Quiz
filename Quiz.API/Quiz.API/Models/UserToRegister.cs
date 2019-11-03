namespace Quiz.API.Models
{
    public class UserToRegister
    {
        public int? UserId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}