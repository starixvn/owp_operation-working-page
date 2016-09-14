using Fanex.NAP.OWP.TaskScheduling.Builder;
using Fanex.NAP.OWP.TaskScheduling.Misc;
using Olympus.InfoSiteClient.Models;
using Xunit;

namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Builder
{
    public class WatchBetBuilderUnitTests
    {
        [Fact]
        public void GetStreamName_SourceEmpty_ReturnEmpty()
        {
            var actual=WatchBetBuilder.GetStreamName(null, Constant.StreamNameSrc1InfoSite);
            Assert.Equal(string.Empty, actual);
        }

        [Fact]
        public void GetStreamName_SourceHasValue0_ReturnEmpty()
        {
            var actual = WatchBetBuilder.GetStreamName(0, Constant.StreamNameSrc1InfoSite);
            Assert.Equal(string.Empty, actual);
        }

        [Fact]
        public void GetStreamName_SourceHasValue4_ReturnValueSPANISH()
        {
            var actual = WatchBetBuilder.GetStreamName(4, Constant.StreamNameSrc1InfoSite);
            Assert.Equal("Spanish", actual);
        }

        [Fact]
        public void GetStreamName_SourceHasValue4_ReturnValueIMG()
        {
            var actual = WatchBetBuilder.GetStreamName(8, Constant.StreamNameSrc1InfoSite);
            Assert.Equal("IMG", actual);
        }

        [Fact]
        public void GetStreamName_SourceHasValue4_ReturnValueWatchAndBet()
        {
            var actual = WatchBetBuilder.GetStreamName(9, Constant.StreamNameSrc1InfoSite);
            Assert.Equal("Watch & Bet", actual);
        }

        [Fact]
        public void GetStreamName_SourceHasValue4_ReturnValueGlive()
        {
            var actual = WatchBetBuilder.GetStreamName(11, Constant.StreamNameSrc2InfoSite);
            Assert.Equal("Glive", actual);
        }

        [Fact]
        public void GetStreamName_SourceHasValue4_ReturnValueSPORTRADAR()
        {
            var actual = WatchBetBuilder.GetStreamName(12, Constant.StreamNameSrc1InfoSite);
            Assert.Equal("SportRadar", actual);
        }

        [Fact]
        public void GetStreamName_SourceHasValue4_ReturnValueINHOUSE()
        {
            var actual = WatchBetBuilder.GetStreamName(13, Constant.StreamNameSrc1InfoSite);
            Assert.Equal("In House", actual);
        }

        [Fact]
        public void BuildStream_srcIsNull_IdIsNull_ReturnEmpty()
        {
            var actual = WatchBetBuilder.BuildStream(null,null, Constant.StreamNameSrc1InfoSite);
            Assert.Equal(string.Empty, actual);
        }

        [Fact]
        public void BuildStream_srcHasValue_IdHasValue_ReturnEmpty()
        {
            var actual = WatchBetBuilder.BuildStream(13, "12", Constant.StreamNameSrc1InfoSite);
            Assert.Equal("In House-12", actual);
        }

        [Fact]
        public void SelectTemplateWb_wbIsNull_streamHasValue_ReturnValueCorrect()
        {
            var actual = WatchBetBuilder.SelectTemplateWb(null, "12");
            Assert.Equal("12", actual);
        }

        [Fact]
        public void SelectTemplateWb_wbHasValue_streamHasValue_ReturnValueCorrect()
        {
            var actual = WatchBetBuilder.SelectTemplateWb("13", "12");
            Assert.Equal("13/12", actual);
        }

        [Fact]
        public void GetWatchBet_wbNull_streamSrc1Null_streamSrc2Null_ReturnEmpty()
        {
            var extInfo = new SoccerEventSchedule();
            var actual = WatchBetBuilder.Build(extInfo);
            Assert.Equal(string.Empty, actual);
        }

        [Fact]
        public void GetWatchBet_wbHasvalue_streamSrc1Hasvalue_streamSrc2Hasvalue_ReturnWatchBetCorrect()
        {
            var extInfo = new SoccerEventSchedule
            {
                wb= "wb",
                create_streaming_src=12,
                create_streaming_id="12",
                create_streaming2_src=13,
                create_streaming2_id="13"
            };
            var actual = WatchBetBuilder.Build(extInfo);
            Assert.Equal("wb/SportRadar-12/13-13", actual);
        }
    }
}
