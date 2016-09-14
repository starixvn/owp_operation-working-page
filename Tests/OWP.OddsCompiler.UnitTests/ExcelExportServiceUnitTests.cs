namespace OWP.OddsCompiler.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using Criteria;
    using Fanex.NAP.Core.Web.Session;
    using Fanex.NAP.OWP.Core.BaseClasses.Interfaces;
    using Fanex.NAP.OWP.Core.Criteria;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using Services;
    using Xunit;

    public class ExcelExportServiceUnitTests
    {
        private readonly Repository repo;

        private readonly ICurrentSession currentSession;

        private readonly IMapper mapper;

        private readonly IOWPBaseService baseService;

        private readonly ExcelExportService exportService;

        public ExcelExportServiceUnitTests()
        {
            repo = Substitute.For<Repository>();
            currentSession = Substitute.For<ICurrentSession>();
            Substitute.For<NotificationService>();
            mapper = Substitute.For<IMapper>();
            baseService = Substitute.For<IOWPBaseService>();
            exportService = new ExcelExportServiceImp(repo, currentSession, mapper, baseService);
        }

        [Fact]
        public async Task GetExcelModel_Always_ReturnExcelModel()
        {
            // Arrange
            var resource = FakeMatches().ToList();
            repo.GetOddsCompiler(Arg.Compat.Any<GetOddsCompilerCriteria>()).Returns(resource);

            var matchStatuses = FakeMatchStatuses().ToList();
            baseService.GetData<ReferenceResource>(Arg.Compat.Any<GetRefResourceByNameCriteria>()).Returns(matchStatuses);

            currentSession.Username.Returns("sa");

            var excelReportModel = FakeExcelReportModels().ToList();

            var excelModel = new ExcelModel
            {
                ExcelModels = excelReportModel
            };

            mapper.Map<List<ExcelReportModel>>(resource).Returns(excelReportModel);

            // Act
            var actual = await exportService.GetExcelModel(new GetOddsCompilerCriteria { Date = new DateTime(2020, 6, 11), MatchStatusIds = "1,2" });

            // Assert
            Assert.Equal(excelModel.ExcelModels, actual.ExcelModels);
        }

        private IEnumerable<MatchInfoModel> FakeMatches()
        {
            return new List<MatchInfoModel>
            {
                new MatchInfoModel
                {
                    OWPMatchId = 440001,
                    MatchNo = "223",
                    EventDate = new DateTime(2020, 6, 12),
                    KickOffTime = new TimeSpan(8,0,0),
                    League = "TestLeague3",
                    Home = "HomeTeam3 – Jun11 – AM",
                    Away = "HomeTeam3 – Jun11 – AM",
                    Provider = "RB2",
                    MatchStatus = "Live",
                    MatchSettings = new List<MatchSetting>
                    {
                        new MatchSetting
                        {
                            OWPMatchId = 440001,
                            Bettype = 1,
                            MaxBet = 100000
                        }
                    },
                    MatchOddsRow = new MatchOddsRow
                    {
                        Handicap = new MatchOdds
                        {
                            OWPMatchId = 440001,
                            Bettype = 1,
                            TeamChoice = 1
                        },
                        OneXTwo = new MatchOdds
                        {
                            OWPMatchId = 440001,
                            Bettype = 5,
                            TeamChoice = 1
                        },
                        OverUnder = new MatchOdds
                        {
                            OWPMatchId = 440001,
                            Bettype = 3,
                            TeamChoice = 1
                        }
                    }
                }
            };
        }

        private IEnumerable<ReferenceResource> FakeMatchStatuses()
        {
            return new List<ReferenceResource>
            {
                new ReferenceResource
                {
                    Name = "MatchStatus",
                    ResourceId = 1,
                    Value = "Live"
                },
                new ReferenceResource
                {
                    Name = "MatchStatus",
                    ResourceId = 2,
                    Value = "In-play"
                }
            };
        }

        private IEnumerable<ExcelReportModel> FakeExcelReportModels()
        {
            return new List<ExcelReportModel>
                {
                    new ExcelReportModel
                    {
                        MatchNo = "223",
                        KickOffTime = "08:00 AM",
                        League = "TestLeague3",
                        Home = "HomeTeam3 – Jun11 – AM",
                        Away = "HomeTeam3 – Jun11 – AM",
                        Provider = "RB2",
                        MatchStatus = "Live",
                        MaxBetHDP = "100K",
                        Fav = "Home"
                    }
                };
        }
    }
}