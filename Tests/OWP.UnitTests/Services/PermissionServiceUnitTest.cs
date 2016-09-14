namespace OWP.Common.UnitTests.Services
{
    using System.Collections.Generic;
    using Constants;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Models.ValueObject;
    using Fanex.NAP.Core.Service.Interface;
    using Fanex.NAP.Core.Web.Session;
    using NSubstitute;
    using OWP.Services;
    using Xunit;

    public class PermissionServiceUnitTest
    {
        private readonly PermissionService permissionService;
        private readonly ICurrentSession currentSession;
        private readonly IUserService userService;

        public PermissionServiceUnitTest()
        {
            userService = Substitute.For<IUserService>();
            currentSession = Substitute.For<ICurrentSession>();
            currentSession.UserId = 99;

            permissionService = new PermissionServiceImp(userService, currentSession);
        }

        [Fact]
        public void GetPermissions_WhenCalled_ReturnListFunctionPolicy()
        {
            // Arrange
            const string functionKey = "1223456";
            var expected = new List<FunctionPolicy>
            {
               new FunctionPolicy
               {
                   Policy =2
               }
            };

            // Act
            userService.GetPermissions(currentSession.UserId, Arg.Compat.Any<int>(), functionKey).Returns(expected);

            var actual = permissionService.GetPermissions(functionKey);

            // Assert
            Assert.False(actual.Count > 0);
        }

        [Fact]
        public void HasRight_WhenCalled_ReturnTrue()
        {
            // Arrange
            const string functionKey = FunctionKeys.WorkingShiftManagement;

            // Act
            userService.GetPermission(currentSession.UserId, Arg.Compat.Any<int>(), functionKey).Returns(2);

            var actual = permissionService.HasRight(functionKey, Constant.Policy.Host);

            // Assert
            Assert.True(actual);
        }
    }
}