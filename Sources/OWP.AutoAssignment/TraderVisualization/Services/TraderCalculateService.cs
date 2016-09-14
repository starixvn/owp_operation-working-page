namespace OWP.AutoAssignment.TraderVisualization.Services
{
    using System.Linq;
    using System.Threading.Tasks;
    using AutoAssignment.Models;
    using Models;
    using Utils;


    public interface TraderCalculateService
    {
        Task<TraderTimeTable> Calculate(SchedulingRequest request);
    }

    public class TraderCalculateServiceImp : TraderCalculateService
    {
        private readonly Repository repository;
        private readonly SingleAssignmentAnalyzerService singleAssignmentAnalyzerService;
        private readonly LinkAssignmentAnalyzerService linkAssignmentAnalyzerService;

        public TraderCalculateServiceImp(Repository repository,
            LinkAssignmentAnalyzerService linkAssignmentAnalyzerService,
            SingleAssignmentAnalyzerService singleAssignmentAnalyzerService)
        {
            this.repository = repository;
            this.linkAssignmentAnalyzerService = linkAssignmentAnalyzerService;
            this.singleAssignmentAnalyzerService = singleAssignmentAnalyzerService;
        }

        public async Task<TraderTimeTable> Calculate(SchedulingRequest request)
        {
            var tradersInfo = (await repository.GetTradersByDate(request.EventDate)).ToList();
            var napUserIds = await repository.GetUserIdFromNapUser();
            var db02TraderIds = await repository.GetUserIdFromDb02();
            var traders = tradersInfo
                .Where(x => napUserIds.Any(y => y == x.UserId) && db02TraderIds.Any(y => y == x.UserId))
                .ToList();
            var model = new TraderTimeTable
            {
                Traders = traders.OrderBy(x => x.ShiftStartTime).ThenBy(x => x.Level).ThenBy(x => x.Username).ToList(),
                EventDate = request.EventDate
            };

            await CalculateAutoAssignment(model, request.RequestId);

            return model;
        }

        public async Task CalculateAutoAssignment(TraderTimeTable model, string requestId)
        {
            var assignments = (await repository.GetAssignmentInfos(requestId)).ToList();

            var linkAssignments = assignments
                .Where(x => x.GroupTrader != null && x.GroupTrader.IsContainsIgnoreCase("Link2G"))
                .ToList();

            var singleAssignments = assignments
                .Except(linkAssignments)
                .ToList();

            linkAssignmentAnalyzerService.Calculate(model, linkAssignments);
            singleAssignmentAnalyzerService.Calculate(model, singleAssignments);
        }

    }
}
