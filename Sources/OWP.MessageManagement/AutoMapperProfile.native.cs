namespace OWP.MessageManagement
{
    using AutoMapper;
    using Criteria;
    using Models;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<MessageBoxQueryParam, MessageBoxQueryCriteria>();
        }
    }
}
