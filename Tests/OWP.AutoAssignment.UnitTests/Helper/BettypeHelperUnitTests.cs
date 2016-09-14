using OWP.AutoAssignment.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace OWP.AutoAssignment.UnitTests.Helper
{
    public class BettypeHelperUnitTests
    {
        [Theory]
        [InlineData(new object[] { new int[] { 0, -1, -2, -92, -93, -100, -14 } })]

        public void BuildGroupBettype_BettypeFT_ReturnGroupBettypeCorrect(IEnumerable<int> bettypes)
        {
            var actual = BettypeHelper.BuildGroupBettype(bettypes);
            var expected = new Dictionary<string, IEnumerable<int>>
            {
                {
                    "FT",
                    new List<int> { 0, -1, -2, -92, -93, -100, -14 }
                }
            };
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(new object[] { new int[] { -6, -7, -91, -8 } })]
        public void BuildGroupBettype_BettypeBooking_ReturnGroupBettypeCorrect(IEnumerable<int> bettypes)
        {
            var actual = BettypeHelper.BuildGroupBettype(bettypes);
            var expected = new Dictionary<string, IEnumerable<int>>
            {
                {
                    "Booking",
                    new List<int> { -6, -7, -91, -8 }
                }
            };
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(new object[] { new int[] { -3, -4, -90, -5, -94, -95 } })]
        public void BuildGroupBettype_BettypeCorner_ReturnGroupBettypeCorrect(IEnumerable<int> bettypes)
        {
            var actual = BettypeHelper.BuildGroupBettype(bettypes);
            var expected = new Dictionary<string, IEnumerable<int>>
            {
                {
                    "Corner",
                    new List<int> { -3, -4, -90, -5, -94, -95 }
                }
            };
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(new object[] { new int[] { -999, -998, -997 } })]
        public void BuildGroupBettype_BettypeOther_ReturnGroupBettypeCorrect(IEnumerable<int> bettypes)
        {
            var actual = BettypeHelper.BuildGroupBettype(bettypes);
            var expected = new Dictionary<string, IEnumerable<int>>
            {
                {
                    "Other",
                    new List<int> { -999, -998, -997 }
                }
            };
            Assert.Equal(expected, actual);
        }
    }
}
