namespace OWP.AutoAssignment.UnitTests.Service
{
    using System;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using Services;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class SaveRequestServiceUnitTests : IDisposable
    {
        private readonly Repository repository;
        private readonly SaveRequestService saveRequestService;

        public SaveRequestServiceUnitTests()
        {
            repository = Substitute.For<Repository>();
            saveRequestService = new SaveRequestServiceImp(repository);
        }

        [Fact]
        public async Task SaveRequest_WithContentEmpty_ReturnCode1()
        {
            // Arrange
            var httpRequestMessage =
                new HttpRequestMessage { Content = new StringContent("", Encoding.UTF8, "application/json") };
            var expect = new ResultDataObject
            {
                Code = 1,
                Message = "Data not found"
            };

            // Act
            var actual = await saveRequestService.Save(httpRequestMessage);

            // Assert
            DeepAssert.Equal(expect.Message, actual.Message);
        }

        [Fact]
        public async Task SaveRequest_Successfully()
        {
            // Arrange
            var httpRequestMessage = new HttpRequestMessage();
            const string testData = "{ RequestId: '64df53f3-6354-488b-beab-7a3423584a14', Code: 0, " +
                "Data: [" +
                    "{MatchId: 454107,Bettype: 0,StatusCode: 200,Group:'FT_Corner',ExtraTime:'ET'," +
                    "LA_SusId: 3856027,FTHDP_TraderId:1111,1HHDP_TraderId:2222,FTOU_TraderId:3333,1HOU_TraderId:4444}" +
                "]}";
            httpRequestMessage.Content = new StringContent(testData, Encoding.UTF8, "application/json");
            var expect = new ResultDataObject
            {
                Code = 0
            };
            repository
                .SaveRequest(Arg.Compat.Any<SaveRequestModel>())
                    .Returns(expect);
            // Act
            var actual = await saveRequestService.Save(httpRequestMessage);

            // Assert
            await repository.Received().SaveRequest(Arg.Compat.Is<SaveRequestModel>(p =>
                 p.Data[0].StatusCode == 200 && p.Data[0].MatchId == 454107 && p.Data[0].Bettype == 0 &&
                 p.Data[0].Group == "FT_Corner" && p.Data[0].ExtraTime == "ET" &&
                 p.Data[0].UserId_LA == 3856027 &&
                 p.Data[0].UserId_FTHDP == 1111 &&
                 p.Data[0].UserId_1HHDP == 2222 &&
                 p.Data[0].UserId_FTOU == 3333 &&
                 p.Data[0].UserId_1HOU == 4444));

            DeepAssert.Equal(expect, actual);
        }

        protected virtual void Dispose(bool disposing)
        {
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}