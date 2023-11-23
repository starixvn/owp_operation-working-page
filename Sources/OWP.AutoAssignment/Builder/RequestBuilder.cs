using Fanex.Common.Extensions;
using OWP.Utils;

namespace OWP.AutoAssignment.Builder
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Enum;
    using Models;

    public interface RequestBuilder
    {
        Task<IEnumerable<RequestSender>> BuildListRequestSenderForNewRequest(IEnumerable<RequestModel> request);

        Task<IEnumerable<TraderInfo>> GetTradersInfo(DateTime eventDate);
    }

    public class RequestBuilderImp : RequestBuilder
    {
        private readonly IList<RequestSender> sender = new List<RequestSender>();
        private IEnumerable<SchedulingMatch> schedulingMatch = new List<SchedulingMatch>();
        private IEnumerable<SchedulingLAUser> schedulingLAUser = new List<SchedulingLAUser>();
        private IEnumerable<TraderInfo> traderInfos = new List<TraderInfo>();

        private readonly Repository repository;
        private readonly Visualization.Repository visualizationRepository;
        private readonly SchedulingMatchBuilder schedulingMatchBuilder;
        private readonly SchedulingUserBuilder schedulingUserBuilder;
    
        public RequestBuilderImp(
            Repository repository,
            Visualization.Repository visualizationRepository,
            SchedulingMatchBuilder schedulingMatchBuilder,
            SchedulingUserBuilder schedulingUserBuilder)
        {
            this.repository = repository;
            this.visualizationRepository = visualizationRepository;
            this.schedulingMatchBuilder = schedulingMatchBuilder;
            this.schedulingUserBuilder = schedulingUserBuilder;
        }

        public async Task<IEnumerable<RequestSender>> BuildListRequestSenderForNewRequest(IEnumerable<RequestModel> request)
        {
            foreach (var req in request)
            {
                schedulingMatch = await GetMatchesInfo(req.EventDate);
                schedulingLAUser = await GetLAUsersInfo(req.EventDate);
                traderInfos = await GetTradersInfo(req.EventDate);

                if (schedulingMatch.Any() && (schedulingLAUser.Any() || traderInfos.Any()))
                {
                    sender.Add(BuildRequestSender(req, "New"));
                    await UpdateStatusRequest(req, StatusRequest.Running);
                }
                else
                {
                    await UpdateStatusRequest(req, StatusRequest.Success);
                }
            }
            return sender;
        }

        private async Task<IEnumerable<SchedulingLAUser>> GetLAUsersInfo(DateTime eventDate)
        {
            var LAUsers = await repository.GetUsers(eventDate);
            return schedulingUserBuilder.BuildListSchedulingLAUser(LAUsers);
        }

        public async Task<IEnumerable<TraderInfo>> GetTradersInfo(DateTime eventDate)
        {
            var traders = await repository.GetTraders(eventDate);
            var napUserIds = await visualizationRepository.GetUserInfoFromNAPUserControl();
            var db02CustIds = await visualizationRepository.GetCustInfoFromDB02();
            var filteredUsers = traders.Item1.Where(x => napUserIds.Any(y => y == x.TraderId) && db02CustIds.Any(y => y == x.TraderId));
            MapMultipleGames(filteredUsers);

            var workingShifts = traders.Item2;

            return schedulingUserBuilder.BuildTradersInfo(filteredUsers, workingShifts);
        }

        public static void MapMultipleGames(IEnumerable<TraderInfo> traders)
        {
            var maxGameDict = new Dictionary<string, int?>
            {
                {string.Empty, 2},
                {"1G", 1}
            };

            traders.ForEach(x => x.MaxGames = maxGameDict.GetValue(x.MultipleGames ?? string.Empty, null));
        }

        private async Task<IEnumerable<SchedulingMatch>> GetMatchesInfo(DateTime eventDate)
        {
            var matches = await repository.GetMatches(eventDate);
            var mainMatchs = matches.Where(m => m.SchedulingBettypeId == 0);

            return schedulingMatchBuilder.BuildListSchedulingMatch(mainMatchs, matches);
        }

        private async Task UpdateStatusRequest(RequestModel requestModel, StatusRequest status)
            => await repository.UpdateStatusRequest(new StatusRequestModel
            {
                RequestId = requestModel.RequestId,
                Status = status
            });

        private RequestSender BuildRequestSender(RequestModel model, string action)
        {
            return new RequestSender
            {
                Action = action,
                RequestId = model.RequestId,
                DataHolder = BuildDataHolder(),
                EventDate = model.EventDate
            };
        }

        private DataHolder BuildDataHolder()
            => new DataHolder
            {
                Matches = schedulingMatch,
                Suspenders = schedulingLAUser,
                Traders = traderInfos
            };
    }
}