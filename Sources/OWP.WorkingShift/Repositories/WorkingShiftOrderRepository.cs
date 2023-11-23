namespace OWP.WorkingShift.Repositories
{
    using System.Threading.Tasks;
    using AutoMapper;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using OWP.Models;

    public interface WorkingShiftOrderRepository
    {
        Task<ResultDataObject> UpdateEmployeeWorkingShiftOrder(UpdateEmployeeWorkingShiftOrderModel model);
    }

    public class WorkingShiftOrderRepositoryImp: WorkingShiftOrderRepository
    {
        private readonly IMapper mapper;
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentSession currentSession;

        public WorkingShiftOrderRepositoryImp(IMapper mapper, IDynamicRepository dynamicRepository, ICurrentSession currentSession)
        {
            this.mapper = mapper;
            this.dynamicRepository = dynamicRepository;
            this.currentSession = currentSession;
        }

        public async Task<ResultDataObject> UpdateEmployeeWorkingShiftOrder(UpdateEmployeeWorkingShiftOrderModel model)
        {
            var criteria = mapper.Map<UpdateEmployeeWorkingShiftOrderCriteria>(model);
            criteria.ActorId = currentSession.UserId;
            
            await dynamicRepository.ExecuteAsync(criteria);

            return new ResultDataObject
            {
                Code = (int)ErrorCode.Ok
            };
        }
    }
}
