using Fanex.Data.Repository;
using NSubstitute;
using OWP.Models;
using OWP.Services;
using System.Collections.Generic;
using Xunit;

namespace OWP.Common.UnitTests.Services
{
    public class CheckIsLiveStatusServicesUnitTests
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly CheckIsLiveStatusServicesImp services;

        public CheckIsLiveStatusServicesUnitTests()
        {
            dynamicRepository = Substitute.For<IDynamicRepository>();
            services = new CheckIsLiveStatusServicesImp(dynamicRepository);
        }

        [Theory]
        [InlineData(null, 777, true)]        
        [InlineData(-4, 777, false)]        
        [InlineData(null, 888, false)]        
        [InlineData(-98, 888, true)]        
        [InlineData(-3, 888, true)]        
        [InlineData(null, 999, false)]
        public void GetOfferLiveStatus(int? minorBettypeId, int parentAdminSiteId, bool expected)
        {
            var resultFromMainDb = GetResultFromMainDB();

            var actual = services.GetOfferLiveStatus(minorBettypeId, parentAdminSiteId, resultFromMainDb);

            Assert.Equal(expected, actual);
        }

        private List<IsLiveMatchInfo> GetResultFromMainDB()
            => new List<IsLiveMatchInfo>
            {
                new IsLiveMatchInfo { MatchId = 777, ParentId = null, SubType = 0, OfferLive = true },
                new IsLiveMatchInfo { MatchId = 100, ParentId = 777, SubType = 2188, OfferLive = false },
                new IsLiveMatchInfo { MatchId = 200, ParentId = 777, SubType = 2129, OfferLive = true },
                new IsLiveMatchInfo { MatchId = 888, ParentId = null, SubType = 0, OfferLive = false },
                new IsLiveMatchInfo { MatchId = 400, ParentId = 888, SubType = 1101, OfferLive = true },
                new IsLiveMatchInfo { MatchId = 500, ParentId = 888, SubType = 1140, OfferLive = true },
                new IsLiveMatchInfo { MatchId = 600, ParentId = 888, SubType = 1153, OfferLive = false },
                new IsLiveMatchInfo { MatchId = 700, ParentId = 888, SubType = 2000, OfferLive = true },
            };
    }
}
