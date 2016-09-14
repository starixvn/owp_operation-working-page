namespace OWP.WorkingShift.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Criteria;
    using Fanex.Data.Repository;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using OWP.Criteria;
    using OWP.Models;
    using OWP.Utils;

    public interface WorkingShiftTimezoneSettingRepository
    {
        Task<ResultDataObject> Update(TimezoneUpdateModel model);

        Task<IList<TimezoneSettingModel>> GetTimezoneSettings();

        Task<TimezoneSettingModel> GetSelectedTimezoneSetting();

        Task<TimezoneSettingModel> GetTimezoneSettingByOffset(int offset);
    }

    public class WorkingShiftTimezoneSettingRepositoryImp : WorkingShiftTimezoneSettingRepository
    {
        private readonly IDynamicRepository repository;
        private readonly ICurrentSession currentSession;

        public WorkingShiftTimezoneSettingRepositoryImp(IDynamicRepository repository, ICurrentSession currentSession)
        {
            this.repository = repository;
            this.currentSession = currentSession;
        }

        public async Task<IList<TimezoneSettingModel>> GetTimezoneSettings()
        {
            var criteria = new GetTimezoneSettingCriteria
            {
                UserId = currentSession?.UserId ?? 0
            };
            
            return (await repository.FetchAsync<TimezoneSettingModel>(criteria)).ToList();
        }

        public async Task<TimezoneSettingModel> GetSelectedTimezoneSetting()
        {
            var timezoneSettings = await GetTimezoneSettings();
            return timezoneSettings.First(x => x.IsSelected);
        }

        public async Task<ResultDataObject> Update(TimezoneUpdateModel model)
        {
            var criteria = new UpdateTimezoneCriteria
            {
                SettingId = model.SettingId,
                UserId = currentSession.UserId
            };
            
            await repository.ExecuteAsync(criteria);
            return ResultDataObject.Ok;
        }

        public async Task<TimezoneSettingModel> GetTimezoneSettingByOffset(int offset)
        {
            var timezoneSettings = await GetTimezoneSettings();
            return timezoneSettings.First(x => x.Offset == offset);
        }
    }
}