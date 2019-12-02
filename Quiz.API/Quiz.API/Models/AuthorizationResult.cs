using System.Collections.Generic;

namespace Quiz.API.Models
{
    public class AuthorizationResult
    {
        public string AdminId { get; set; }
        public bool Success { get; set; }
        public bool IsAdmin { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}