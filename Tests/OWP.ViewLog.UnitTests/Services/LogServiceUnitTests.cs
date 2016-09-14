namespace OWP.ViewLog.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using Models;
    using ViewLog.Services;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class LogServiceUnitTests
    {
        [Fact]
        public void Parse_WhenCalled_ReturnsModel()
        {
            // Arrange
            const string xml = "<r><z eid=\"26815597\" sids=\"4,4,4,4,4,4,4\" iacw=\"0\" fd=\"2019-10-21\" td=\"2019-10-27\"/></r>";
            var service = new LogServiceImp();

            // Act
            var result = service.Parse<UpdateDefaultShiftModel>(xml);

            // Assert
            var expected = new List<UpdateDefaultShiftModel>
            {
                new UpdateDefaultShiftModel
                {
                    ShiftIds = "4,4,4,4,4,4,4",
                    IsApplyCurrentWeek = false,
                    FromDate = DateTime.Parse("2019-10-21"),
                    ToDate = DateTime.Parse("2019-10-27")
                }
            };
            DeepAssert.Equal(result, expected);
        }

        [Fact]
        public void GetActionName_ReturnsCorrespondingDescription()
        {
            // Arrange
            var service = new LogServiceImp();

            // Act
            var actual = service.GetActionName(79);

            // Assert
            Assert.Equal("Delete a shift", actual);
        }
    }
}
