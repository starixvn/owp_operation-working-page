namespace OWP.Application
{
    using AutoMapper;
    using Message;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<QueryModel, QueryCriteria>();
        }
    }
}