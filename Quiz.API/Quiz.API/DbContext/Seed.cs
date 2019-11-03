using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Quiz.API.Models;

namespace Quiz.API.DbContext
{
    public class Seed
    {
          public static void SeedDatabase(QuizDbContext context) {
            if (context.Database.GetMigrations().Count() > 0
                    && context.Database.GetPendingMigrations().Count() == 0
                    && context.Quiz.Count() == 0) {

                context.Quiz.AddRange(
                    new Models.Quiz {
                        QuizName = "English",
                        Questions = new List<Question> {
                            new Question
                            {
                                QuestionText = "What is the Capital of Algeria",
                                Options = new List<Option>
                                {
                                    new Option
                                    {
                                        OptionText = "Batna",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Annaba",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Algiers",
                                        IsCorrect = true
                                    },
                                    new Option
                                    {
                                        OptionText = "Biskra",
                                        IsCorrect = false
                                    }
                                }

                            },
                            new Question
                            {
                                QuestionText = "What is Your Name",
                                Options = new List<Option>
                                {
                                    new Option
                                    {
                                        OptionText = "Walid",
                                        IsCorrect = true
                                    },
                                    new Option
                                    {
                                        OptionText = "Nadhir",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Ali",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Abdullah",
                                        IsCorrect = false
                                    }
                                }

                            },
                            new Question
                            {
                                QuestionText = "What is Your Last Name",
                                Options = new List<Option>
                                {
                                    new Option
                                    {
                                        OptionText = "Chalabala",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "khanaban",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Aouragh",
                                        IsCorrect = true
                                    },
                                    new Option
                                    {
                                        OptionText = "jalabala",
                                        IsCorrect = false
                                    }
                                }

                            },
                            new Question
                            {
                                QuestionText = "What is Your Favorite Drink",
                                Options = new List<Option>
                                {
                                    new Option
                                    {
                                        OptionText = "halib",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Cofee",
                                        IsCorrect = true
                                    },
                                    new Option
                                    {
                                        OptionText = "monada",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "zalabia",
                                        IsCorrect = false
                                    }
                                }

                            }
                        }
                    },
                        new Models.Quiz {
                        QuizName = "عربية",
                        Questions = new List<Question> {
                            new Question
                            {
                                QuestionText = "ما هي عاصمة الجزائر",
                                Options = new List<Option>
                                {
                                    new Option
                                    {
                                        OptionText = "باتنة",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "عنابة",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "الجزائر",
                                        IsCorrect = true
                                    },
                                    new Option
                                    {
                                        OptionText = "بسكرة",
                                        IsCorrect = false
                                    }
                                }

                            },
                            new Question
                            {
                                QuestionText = "ما هو اسمك",
                                Options = new List<Option>
                                {
                                    new Option
                                    {
                                        OptionText = "وليد",
                                        IsCorrect = true
                                    },
                                    new Option
                                    {
                                        OptionText = "نذير",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "علي",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "عبد الله",
                                        IsCorrect = false
                                    }
                                }

                            },
                        }
                    });
                context.SaveChanges();
            }
        }
    }
}