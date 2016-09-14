namespace OWP.DailyWorkingShift
{
    using AutoMapper;
    using Criteria;
    using Models;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<QueryModel, QueryCriteria>();
        }
    }
}
