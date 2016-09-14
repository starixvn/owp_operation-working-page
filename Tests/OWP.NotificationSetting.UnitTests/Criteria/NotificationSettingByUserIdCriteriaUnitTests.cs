namespace OWP.NotificationSetting.UnitTests.Criteria
{
    using NotificationSetting.Criteria;
    using Xunit;

    public class NotificationSettingByUserIdCriteriaUnitTests
    {
        [Fact]
        public void GetSettingKey_Always_ReturnCorrectSettingKey()
        {
            // Arrange
            var criteria = new NotificationSettingByUserIdCriteria();

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal("OWP_NotificationSetting_GetByUserId", actual);
        }

        [Theory]
        [InlineData(999)]
        [InlineData(1)]
        public void IsValid_ParamsAreValid_ReturnTrue(int id)
        {
            // Arrange
            var criteria = new NotificationSettingByUserIdCriteria
            {
                UserId = id
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        public void IsValid_ParamsAreInvalid_ReturnFalse(int id)
        {
            // Arrange
            var criteria = new NotificationSettingByUserIdCriteria
            {
                UserId = id
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.False(actual);
        }
    }
}