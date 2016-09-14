using OWP.Services;

namespace Fanex.NAP.OWP.EventManagement.Service.Implement
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Core.BaseClasses;
    using Core.Model;
    using Criteria.EventInfo;
    using global::OWP.CopyMatchInfo;
    using Interfaces;
    using Models.EventInfo;
    using Repositories.Interfaces;

    public class EventInformationService : OWPBaseService, IEventInformationService
    {
        private readonly IEventInformationRepository eventInfoRepository;

        private readonly GetAdminSiteMatchIdService getAdminSiteMatchIdService;

        public EventInformationService(IEventInformationRepository eventInfoRepository,
            GetAdminSiteMatchIdService getAdminSiteMatchIdService)
        {
            this.eventInfoRepository = eventInfoRepository;
            this.getAdminSiteMatchIdService = getAdminSiteMatchIdService;
        }

        public OWPCommandResult UpdateIsSelected(UpdateIsSelectedCriteria criteria)
        {
            var commandResult = new OWPCommandResult();

            if (criteria != null && criteria.IsValid())
            {
                commandResult = Repository.UpdateData(criteria);
            }

            return commandResult;
        }

        public async Task<IEnumerable<MatchInfo>> GetEventInformation(GetEventInformationCriteria criteria)
        {
            if (criteria != null && criteria.IsValid())
            {
                var matches = eventInfoRepository.GetEventInformation(criteria).ToList();
                BuildIPTVCopy(matches);
                await BuildAdminSiteId(matches);
                await BuildTicketList(matches);

                return matches;
            }

#pragma warning disable S1168 // Empty arrays and collections should be returned instead of null
            return null;
#pragma warning restore S1168 // Empty arrays and collections should be returned instead of null
        }

        public async Task<IEnumerable<MatchInfo>> GetEventInformationByFilterId(GetEventInformationByFilterIdCriteria criteria)
        {
            if (criteria != null && criteria.IsValid())
            {
                var matches = eventInfoRepository.GetEventInformationByFilterId(criteria).ToList();
                BuildIPTVCopy(matches);
                await BuildAdminSiteId(matches);
                await BuildTicketList(matches);
                return matches;
            }

#pragma warning disable S1168 // Empty arrays and collections should be returned instead of null
            return null;
#pragma warning restore S1168 // Empty arrays and collections should be returned instead of null
        }

        private async Task BuildAdminSiteId(IList<MatchInfo> matches)
        {
            foreach (var match in matches)
            {
                match.AdminSiteId = await getAdminSiteMatchIdService.GetAdminSiteMatchId(match.OWPMatchId,
                    match.ParentMatchId, match.MinorBettypeId);

            }
        }

        private async Task BuildTicketList(List<MatchInfo> matches)
        {
            string matchIds = string.Join(",", matches.Select(x => x.OWPMatchId));
            int userId = CurrentSession.UserId;
            var tickets = (await eventInfoRepository
                .GetTicketsByOwpMatchId(new GetTicketListCriteria
                { OWPMatchIds = matchIds, ActorId = userId }))
                .ToList();
            foreach (var match in matches )
            {
                var ticketList = tickets.Where(x => x.OwpMatchId == match.OWPMatchId)
                    .OrderByDescending(x => x.LatestCreatedDate).ToList();
                match.TicketInfos = ticketList;
                match.HasTicket = ticketList.Any();
                match.IsRead = ticketList.All(x => x.IsRead);
            }
        }

        private void BuildIPTVCopy(IList<MatchInfo> matches)
        {
            foreach (var match in matches)
            {
                var tvCode = match.Televisions.Select(t => t.TVCode);
                match.IPTVCopy = IPTVBuilder.Build(new IPTVModel
                {
                    TeleVision= string.Join("/", tvCode),
                    IpTv= match.IPTV,
                    Channel= match.Channel,
                    Stream=match.WatchBet
                });
            }
        }
    }
}