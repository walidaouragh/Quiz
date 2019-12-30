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
                                QuestionText = "What was the name of the Ethiopian Wolf before they knew it was related to wolves?",
                                Options = new List<Option>
                                {
                                    new Option
                                    {
                                        OptionText = "Ethiopian Coyote",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Amharic Fox",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Canis Simiensis",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Simien Jackel",
                                        IsCorrect = true
                                    }
                                }

                            },
                            new Question
                            {
                                QuestionText = "How many countries are inside the United Kingdom?",
                                Options = new List<Option>
                                {
                                    new Option
                                    {
                                        OptionText = "Two",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Three",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "One",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Four",
                                        IsCorrect = true
                                    }
                                }

                            },
                            new Question
                            {
                                QuestionText = "The idea of Socialism was articulated and advanced by whom?",
                                Options = new List<Option>
                                {
                                    new Option
                                    {
                                        OptionText = "Vladimir Lenin",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Joseph Stalin",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Vladimir Putin",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Karl Marx",
                                        IsCorrect = true
                                    }
                                }

                            },
                            new Question
                            {
                                QuestionText = "HTML is what type of language?",
                                Options = new List<Option>
                                {
                                    new Option
                                    {
                                        OptionText = "Markup Language",
                                        IsCorrect = true
                                    },
                                    new Option
                                    {
                                        OptionText = "Scripting Language",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Programming Language",
                                        IsCorrect = false
                                    },
                                    new Option
                                    {
                                        OptionText = "Macro Language",
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
                                QuestionText = "من الأديب العربي الذي نال جائزة نوبل للآداب عام 1988م",
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