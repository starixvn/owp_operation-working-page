namespace OWP.AutoAssignment.Services
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using Fanex.Common.Extensions;
    using Fanex.NAP.OWP.Core.Extensions.ExcelExtensions;
    using Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment;
    using Models;
    using AIOAssignmentModel = Models.AIOAssignmentModel;
    using AssignmentModel = Models.AssignmentModel;
    using FMAssignmentModel = Models.FMAssignmentModel;
    using Handicap1stAssignmentModel = Models.Handicap1stAssignmentModel;
    using HandicapAssignmentModel = Models.HandicapAssignmentModel;
    using OneXTwo1stAssignmentModel = Models.OneXTwo1stAssignmentModel;
    using OneXTwoAssignmentModel = Models.OneXTwoAssignmentModel;
    using OverUnder1stAssignmentModel = Models.OverUnder1stAssignmentModel;
    using OverUnderAssignmentModel = Models.OverUnderAssignmentModel;
    using Specific10MinsAssignmentModel = Models.Specific10MinsAssignmentModel;
    using Specific15MinsAssignmentModel = Models.Specific15MinsAssignmentModel;
    using SpecificXMinsAssignmentModel = Models.SpecificXMinsAssignmentModel;

    public interface ExportService
    {
        Task Export(Stream stream, SchedulingRequest request);
    }

    public class ExportServiceImp : ExportService
    {
        private readonly Repository repository;
        private readonly IMapper mapper;

        public ExportServiceImp(Repository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task Export(Stream stream, SchedulingRequest request)
        {
            var eventInfos = await repository.GetEventInfo(request);
            var autoAssigneesInfo = await repository.GetAutoAssigneesInfo(request.EventDate);
            var exportModel = BuildExportInfo(eventInfos, autoAssigneesInfo);

            var maxNote = exportModel.Any() ? exportModel.Max(n => n.Notes.Count()) : 0;
            var writer = new AutoAssignmentWriter(maxNote, request.EventDate, request.RequestId);
            exportModel.WriteExcel(writer, stream, typeof(ExportModel));
        }

        private IList<ExportModel> BuildExportInfo(IEnumerable<EventModel> eventInfo, IEnumerable<AutoAssigneeModel> autoAssignees)
        {
            var matchInfo = new List<ExportModel>();
            eventInfo.ForEach(@event =>
            {
                var match = new ExportModel
                {
                    MatchNo = @event.MatchNo,
                    InfoSiteMatchId = @event.InfoSiteMatchId,
                    Time = @event.Time,
                    OtherTime = @event.OtherTime,
                    MatchOffer = @event.MatchOffer,
                    LeagueName = @event.LeagueName,
                    HomeName = @event.HomeName,
                    AwayName = @event.AwayName,
                    Round = @event.Round,
                    OutSide = @event.OutSide,
                    Remark = @event.Remark,
                    MatchStatus = @event.MatchStatus,
                    Notes = @event.Notes,
                    NoOfHDP = @event.NoOfHDP,
                    Assignments = new AssignmentModel
                    {
                        Handicap = mapper.Map<HandicapAssignmentModel>(@event.Assignments.Handicap),
                        Handicap1st = mapper.Map<Handicap1stAssignmentModel>(@event.Assignments.Handicap1st),
                        OverUnder = mapper.Map<OverUnderAssignmentModel>(@event.Assignments.OverUnder),
                        OverUnder1st = mapper.Map<OverUnder1stAssignmentModel>(@event.Assignments.OverUnder1st),
                        OneXTwo = mapper.Map<OneXTwoAssignmentModel>(@event.Assignments.OneXTwo),
                        OneXTwo1st = mapper.Map<OneXTwo1stAssignmentModel>(@event.Assignments.OneXTwo1st),
                        Specific15Mins = mapper.Map<Specific15MinsAssignmentModel>(@event.Assignments.Specific15Mins),
                        Specific10Mins = mapper.Map<Specific10MinsAssignmentModel>(@event.Assignments.Specific10Mins),
                        SpecificXMins = mapper.Map<SpecificXMinsAssignmentModel>(@event.Assignments.SpecificXMins),
                        FM = mapper.Map<FMAssignmentModel>(@event.Assignments.FM),
                        AIO = mapper.Map<AIOAssignmentModel>(@event.Assignments.AIO),
                        LA2nd = new LASerializeModel
                        {
                            MainTrader = @event.Assignments.LA2nd.MainTrader,
                            OtherTraders = @event.Assignments.LA2nd.OtherTraders,
                            AutoTrader = autoAssignees.Any(l => l.OWPMatchId == @event.Assignments.MatchId)
                                ? autoAssignees.First(l => l.OWPMatchId == @event.Assignments.MatchId).Trader_LA
                                : null
                        },
                        AutoTrader = autoAssignees.Any(l => l.OWPMatchId == @event.Assignments.MatchId)
                                ? mapper.Map<AutoTraderModel>(autoAssignees.First(l => l.OWPMatchId == @event.Assignments.MatchId))
                                : new AutoTraderModel()
                    },
                    TVCode = @event.TVCode,
                    Channel = @event.Channel,
                    WatchBet = @event.WatchBet,
                    Agent = @event.Agent,
                    OtherProvider = @event.OtherProvider,
                    Provider = @event.Provider,
                    Phone = @event.ReporterPhone,
                    Website = @event.Website,
                    Website2 = @event.Website2,
                    Website3 = @event.Website3,
                    Website4 = @event.Website4
                };
                matchInfo.Add(match);
            });
            return matchInfo;
        }
    }
}
