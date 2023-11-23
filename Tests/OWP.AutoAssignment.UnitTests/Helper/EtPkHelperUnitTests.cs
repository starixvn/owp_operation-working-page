using OWP.AutoAssignment.Helper;
using Xunit;

namespace OWP.AutoAssignment.UnitTests.Helper
{
    public class EtPkHelperUnitTests
    {
        [Theory]
        [InlineData("Corner", "abcetcnd", "ET")]
        [InlineData("Corner", "abcpkcnd", "NM")]
        [InlineData("Booking", "abcetcnd", "ET")]
        [InlineData("Booking", "abcpkcnd", "NM")]
  
        [InlineData("FT", "abcetcnd", "ETPK")]
        [InlineData("FT", "abcpkcnd", "PK")]
        [InlineData("FT", "abcxyz", "NM")]
        [InlineData("Other", "abcetcnd", "ETPK")]
        [InlineData("Other", "abcpkcnd", "PK")]
        [InlineData("Other", "abcxyz", "NM")]
        [InlineData("Other", "", "NM")]
        public void DetectEtPkByExtraTime_ReturnEtPkCorrect(string group, string extraTime, string expected)
        {
            var actual = EtPkHelper.DetectEtPkByExtraTime(group, extraTime);
            Assert.Equal(expected, actual);
        }
    }
}
