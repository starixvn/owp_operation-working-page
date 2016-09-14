namespace Fanex.NAP.OWP.TaskScheduling
{
    using AutoMapper;
    using Models.EventPicking;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TVList, Condition>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Label));
        }
    }
}