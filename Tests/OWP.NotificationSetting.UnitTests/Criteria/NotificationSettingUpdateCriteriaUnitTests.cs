namespace OWP.NotificationSetting.UnitTests.Criteria
{
    using NotificationSetting.Criteria;
    using Xunit;

    public class NotificationSettingUpdateCriteriaUnitTests
    {
        [Fact]
        public void GetSettingKey_Always_ReturnCorrectSettingKey()
        {
            // Arrange
            var criteria = new NotificationSettingUpdateCriteria();

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal("OWP_NotificationSetting_Update", actual);
        }

        [Theory]
        [InlineData(1, 1)]
        [InlineData(99, 99)]
        public void IsValid_ParamsAreValid_ReturnTrue(int userId, int settingId)
        {
            // Arrange
            var criteria = new NotificationSettingUpdateCriteria
            {
                UserId = userId,
                NotificationSettingId = settingId
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }

        [Theory]
        [InlineData(0, 0)]
        [InlineData(0, 1)]
        [InlineData(1, 0)]
        [InlineData(-1, 1)]
        public void IsValid_ParamsAreInvalid_ReturnFalse(int userId, int settingId)
        {
            // Arrange
            var criteria = new NotificationSettingUpdateCriteria
            {
                UserId = userId,
                NotificationSettingId = settingId
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.False(actual);
        }
    }
}