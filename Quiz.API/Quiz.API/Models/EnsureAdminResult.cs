using System.Collections.Generic;

namespace Quiz.API.Models
{
    public class EnsureAdminResult
    {
        public IReadOnlyCollection<string> Errors { get; set; }
        public bool Succeeded { get; set; }
    }
}