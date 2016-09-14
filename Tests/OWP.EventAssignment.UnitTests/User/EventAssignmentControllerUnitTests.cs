namespace OWP.EventAssignment.UnitTests.User
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using NSubstitute;
    using OWP.EventAssignment.User;
    using Xunit;

    public class UserControllerUnitTests : IDisposable
    {
        private readonly Repository repository;
        private readonly UserController controller;

        public UserControllerUnitTests()
        {
            repository = Substitute.For<Repository>();
            controller = new UserController(repository);
        }

        [Fact]
        public async Task Query_WhenCalledWithEventDate_ReturnListUserInfo()
        {
            // Arrange
            var eventDate = new DateTime(2018, 10, 10);
            var expected = new List<UserInfo> {
                new UserInfo
                {
                    UserId = 8,
                    Username = "sa",
                    Nickname="superman",
                    Level="1+",
                    Phone="123",
                    ShiftBackground="#000",
                    ShiftCode="3>7",
                    ShiftColor="#FFF",
                    Skype="skype"
                }
            };
            repository.Query(Arg.Compat.Is<DateTime>(x => x == eventDate)).Returns(expected);

            // Act
            var actual = await controller.Query(eventDate);

            // Assert
            Assert.Equal(expected, actual);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            controller.Dispose();
        }

        ~UserControllerUnitTests()
        {
            Dispose(false);
        }
    }
}