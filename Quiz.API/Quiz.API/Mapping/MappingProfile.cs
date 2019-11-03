using System.Collections.Generic;
using AutoMapper;
using Quiz.API.Models;

namespace Quiz.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserAnswer, AnswerToPost>();
            CreateMap<User, UserToRegister>();
            CreateMap<List<UserAnswer>, List<AnswerToPost>>();
            CreateMap<Option, AnswerToPost>();
        }
    }
}