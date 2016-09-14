namespace Fanex.NAP.OWP.TaskScheduling.UnitTests.Builder
{
    using Fanex.NAP.OWP.TaskScheduling.Builder;
    using Xunit;

    public class ProviderBuilderUnitTest
    {
        [Theory]
        [InlineData("", "")]
        [InlineData("AB/,CD", "AB,CD")]
        public void Build_Always_ReturnProviderFormat(string providers, string expected)
        {
            var actual = ProviderBuilder.Build(providers);

            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("", "")]
        [InlineData(",,,,", "")]
        [InlineData("AB/", "AB")]
        [InlineData("AB/,,,CD/", "AB/CD")]
        [InlineData("AB/,CD,,,EF", "AB/CD/EF")]
        [InlineData("AB,CD/,,,EF,GH", "AB/CD/EF/GH")]
        [InlineData("AB/,CD/,EF,GH,,,,", "AB/CD/EF/GH")]
        public void GetProviderFormat_Always_ReturnProviderFormat(string providers, string expected)
        {
            var actual = ProviderBuilder.GetProvidersFormat(providers);

            Assert.Equal(expected, actual);
        }
    }
}