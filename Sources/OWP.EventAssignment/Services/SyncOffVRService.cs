using OWP.EventAssignment.Repositories;
using System;
using System.Threading.Tasks;
using Fanex.Logging;
using Newtonsoft.Json;

namespace OWP.EventAssignment.Services
{
    public interface SyncOffVRService
    {
        Task Sync(DateTime date);
    }

    public class SyncOffVRServiceImp: SyncOffVRService
    {
        private readonly Repository repository;

        public SyncOffVRServiceImp(Repository repository)
        {
            this.repository = repository;
        }

        public async Task Sync(DateTime date)
        {
            var result = await repository.GetSyncOffVRMatches(date);
            var json = JsonConvert.SerializeObject(result);

            await repository.LogActionSyncOffVRMatches(date);
            await Logger.Log.InfoAsync($"Syn-Off-VR: ${date}, ${json}");
        }
    }

    public class OffVRModel
    {
        public int OWPMatchId { get; set; }
        public int AdminSiteMatchId { get; set; }
        public string OffVR { get; set; }
    }
}
