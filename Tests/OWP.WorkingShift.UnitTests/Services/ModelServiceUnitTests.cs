namespace OWP.WorkingShift.UnitTests.Services
{
    using System.Collections.Generic;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Models.ValueObject;
    using Fanex.NAP.Core.Web.Session;
    using NSubstitute;
    using OWP.Constants;
    using OWP.Services;
    using WorkingShift.Services;
    using Xunit;

    public class ModelServiceUnitTests
    {
        private readonly ModelService modelService;
        private readonly PermissionService permissionService;

        public ModelServiceUnitTests()
        {
            permissionService = Substitute.For<PermissionService>();
            var currentSession = Substitute.For<ICurrentSession>();
            currentSession.UserId = 99;
            modelService = new ModelServiceImp(permissionService, currentSession);
        }

        [Fact]
        public void GetOrderUserId_WhenCalled_ReturnTrue()
        {
            // Arrange
            const string functionKey = FunctionKeys.WorkingShiftManagement;
            var expected = new List<FunctionPolicy>
            {
               new FunctionPolicy
               {
                   Policy = (int)Constant.Policy.Host,
                   Key =FunctionKeys.WorkingShiftManagement
               }
            };

            // Act
            permissionService.GetPermissions(functionKey).Returns(expected);

            var actual = modelService.GetOrderUserId();

            // Assert
            Assert.True(actual > 0);
        }

        [Fact]
        public void GetOrderUserId_WhenCalled_ReturnNull()
        {
            // Arrange
            const string functionKey = FunctionKeys.WorkingShiftManagement;
            var expected = new List<FunctionPolicy>
            {
               new FunctionPolicy
               {
                   Policy = (int)Constant.Policy.Read,
                   Key =FunctionKeys.WorkingShiftManagement_AllSections

               }
            };

            // Act
            permissionService.GetPermissions(functionKey).Returns(expected);

            var actual = modelService.GetOrderUserId();

            // Assert
            Assert.False(actual > 0);
        }
    }
}