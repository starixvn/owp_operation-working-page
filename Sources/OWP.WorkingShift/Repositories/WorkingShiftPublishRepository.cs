namespace OWP.WorkingShift.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using OWP.Models;
    using OWP.Utils;

    public interface WorkingShiftPublishRepository
    {
        Task<ResultDataObject> PublishSection(PublishWeeklyWorkingShiftModel model);

        Task<IList<SectionPublishWorkingShiftModel>> GetSectionPublishWorkingShift(DateTime fromDate, DateTime toDate, string sectionIds);

        Task<IList<WorkingShiftModel>> GetWeeklyWorkingShiftBySection(WorkingShiftQueryBySectionModel queryModel);
    }

    public class WorkingShiftPublishRepositoryImp : WorkingShiftPublishRepository
    {
        private readonly IMapper mapper;
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentSession currentSession;

        public WorkingShiftPublishRepositoryImp(IMapper mapper, IDynamicRepository dynamicRepository, ICurrentSession currentSession)
        {
            this.mapper = mapper;
            this.dynamicRepository = dynamicRepository;
            this.currentSession = currentSession;
        }

        public async Task<IList<SectionPublishWorkingShiftModel>> GetSectionPublishWorkingShift(DateTime fromDate, DateTime toDate,   string sectionIds)
        {
            var criteria = new GetSectionWorkingShiftPublishByWeekCriteria
            {
                FromDate = fromDate,
                ToDate = toDate,
                SectionIds=sectionIds
            };

            
            return (await dynamicRepository.FetchAsync<SectionPublishWorkingShiftModel>(criteria)).ToList();
        }

        public async Task<ResultDataObject> PublishSection(PublishWeeklyWorkingShiftModel model)
        {
            var criteria = mapper.Map<PublishWeeklyWorkingShiftCriteria>(model);

            criteria.ActorId = currentSession.UserId;

            
            await dynamicRepository.ExecuteAsync(criteria);

            return new ResultDataObject
            {
                Code = (int)ErrorCode.Ok,
                Data = model
            };
        }
        public async Task<IList<WorkingShiftModel>> GetWeeklyWorkingShiftBySection(WorkingShiftQueryBySectionModel queryModel)
        {
            var criteria = mapper.Map<QueryWorkingShiftBySectionCriteria>(queryModel);
            return (await dynamicRepository.FetchAsync<WorkingShiftModel>(criteria)).ToList();
        }

    }
}