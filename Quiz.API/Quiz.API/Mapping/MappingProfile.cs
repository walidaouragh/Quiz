using System.Collections.Generic;
using AutoMapper;
using Quiz.API.Models;

namespace Quiz.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TesterAnswer, AnswerToPost>();
            CreateMap<Tester, TesterToRegister>();
            CreateMap<List<TesterAnswer>, List<AnswerToPost>>();
            CreateMap<Option, AnswerToPost>();
        }
    }
}