namespace OWP.Common.UnitTests.Utils
{
    using System;
    using OWP.Utils;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class DateTimeExtensionsUnitTests
    {
        [Fact]
        public void ConvertToTimeAgo_WhenCall_Return_TextDaysAgo()
        {
            // Arrange
            var mockDate = DateTime.Now;
            var date = mockDate.AddDays(-1);

            const string expected = "1 days ago";

            // Act

            var actual = date.ConvertToTimeAgo();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void ConvertToTimeAgo_WhenCall_Return_TextHoursAgo()
        {
            // Arrange
            var mockDate = DateTime.Now;
            var date = mockDate.AddHours(-1);
            const string expected = "1 hours ago";

            // Act

            var actual = date.ConvertToTimeAgo();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public static void ConvertToTimeAgo_WhenCall_Return_TextMinutesAgo()
        {
            // Arrange
            var mockDate = DateTime.Now;
            var date = mockDate.AddMinutes(-30);
            const string expected = "30 minutes ago";

            // Act

            var actual = date.ConvertToTimeAgo();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void ConvertToTimeAgo_WhenCall_Return_TextSecondsAgo()
        {
            // Arrange
            var mockDate = DateTime.Now;
            var date = mockDate.AddSeconds(-30);
            const string expected = "30 seconds ago";

            // Act

            var actual = date.ConvertToTimeAgo();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void TimeRangeOfDate_Return_Successfully()
        {
            // Arrange
            var mockDate = new DateTime(2019, 04, 21, 20, 35, 0);

            var expected = DateTime.Parse("2019/04/22 11:59:59AM");

            // Act

            var actual = mockDate.TimeRangeOfDate();

            // Assert
            DeepAssert.Equal(expected, actual);
        }
    }
}