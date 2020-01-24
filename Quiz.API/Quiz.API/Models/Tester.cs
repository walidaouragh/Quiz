using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.API.Models
{
    public class Tester
    {
        //if i don't add next line, will get this error "Cannot insert explicit value for identity column in table 'table' when IDENTITY_INSERT is set to OFF"
        //because trying to add the same columns in Identity
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? TesterId { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Email { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string FirstName { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string LastName { get; set; }
        public List<TesterAnswer> TesterAnswers { get; set; }
    }
}