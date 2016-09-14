namespace OWP.Common.UnitTests.Utils
{
    using OWP.Utils;
    using Xunit;

    public class UserHelperUnitTests
    {
        [Fact]
        public void GetFlagCodeFromLocationCode_WhenCall_Return_Empty()
        {
            // Arrange
            var mock = string.Empty;
            var expected = string.Empty;

            // Act

            var actual = UserHelper.GetFlagCodeFromLocationCode(mock);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void GetFlagCodeFromLocationCode_WhenCall_Return_vn()
        {
            // Arrange
            const string mock = "SMS";
            const string expected = "vn";

            // Act

            var actual = UserHelper.GetFlagCodeFromLocationCode(mock);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void GetFlagCodeFromLocationCode_WhenCall_Return_ph()
        {
            // Arrange
            const string mock = "CTI";
            const string expected = "ph";

            // Act

            var actual = UserHelper.GetFlagCodeFromLocationCode(mock);

            // Assert
            Assert.Equal(expected, actual);
        }
    }
}