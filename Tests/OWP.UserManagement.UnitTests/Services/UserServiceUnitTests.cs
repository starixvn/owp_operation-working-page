namespace OWP.UserManagement.UnitTests.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using Repositories;
    using UserManagement.Services;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class UserServiceUnitTests
    {
        private readonly ModelService modelService;
        private readonly Repository repository;
        private readonly UsersService usersService;
        private readonly ResourceRepository resourceRepository;

        public UserServiceUnitTests()
        {
            repository = Substitute.For<Repository>();
            modelService = Substitute.For<ModelService>();
            resourceRepository = Substitute.For<ResourceRepository>();
            var currentSession = Substitute.For<ICurrentSession>();
            currentSession.UserId = 99;
            usersService = new UsersServiceImp(modelService, repository, currentSession, resourceRepository);
        }

        [Fact]
        public async Task GetUserPagingAsync_WithUserManagementPermission_WhenCalled_ReturnFullPermission()
        {
            var section = "LST";
            // Arrange
            var userPermission = new UserManagementPermission
            {
                UserManagement = new PermissionModel(true, true),
                UserManagementAllSections = new PermissionModel(true, true),
                UserManagementOwnSection = new PermissionModel(true, true),
            };
            var queryModel = new QueryModel
            {
                CategoryId = 1,
                PageIndex = 1,
                PageSize = 10,
                User = "",
                DepartmentId = 1,
                LocationCode = "SMS",
                RoleId = 1,
                SectionId = 1
            };

            var listUser = new List<User>
            {
                new User{UserId=1, UserName="sa"},
                new User{UserId=2, UserName="starix15" }
            };

            // Act
            var expected = new UserManagementViewModel
            {
                Users = listUser,
                CurrentPage = 1,
                TotalItem = 2,
                ItemsPerPage = 10
            };

            var userColumnModels = new List<UserColumnModel>
            {
                new UserColumnModel(userPermission,section) { HeaderText="Employee ID", Name="EmployeeId", Width=80},
                new UserColumnModel(userPermission,section) {HeaderText="Account Name", Name="AccountName", Width=150, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermission,section) { HeaderText="Full Name", Name="FullName", Width=200,  HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermission,section) {HeaderText="Nick Name", Name="NickName", Width=130,  HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermission,section) { HeaderText= "Department", Width= 120, Name= "Department", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Section", Width= 120, Name= "Section", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Group", Width= 150, Name= "Group", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Role", Width= 120, Name= "Role", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Extension", Width= 70, Name= "Extension", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Phone", Width= 120, Name= "Phone", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Email", Width= 250, Name= "Email", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Skype", Width= 120, Name= "Skype", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Category", Width= 120, Name= "Category", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Location", Width= 80, Name= "Location", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Level", Width= 80, Name= "Level", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Pickup", Width= 80, Name= "Pickup", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Address", Width= 200, Name= "Address", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Second Account", Width= 100, Name= "IsSecondAccount", HeaderAlign= "left", CellAlign= "left" }
            };

            modelService.BuildPermissionViewModel().Returns(userPermission);
            modelService.BuildUserColumnModel(Arg.Compat.Any<UserManagementPermission>(), Arg.Compat.Any<string>()).Returns(userColumnModels);

            repository.GetUserPagingAsync(Arg.Compat.Any<QueryModel>()).Returns(expected);

            var actual = await usersService.GetUserPagingAsync(queryModel);

            // Assert
            DeepAssert.Equal(actual.Users, expected.Users);
        }

        [Fact]
        public async Task GetUserPagingAsync_WithUserManagementPermission_WhenCalled_ReturnPermissionOwnSection()
        {
            var section = "LST";
            // Act
            var userPermission = new UserManagementPermission
            {
                UserManagement = new PermissionModel(true, true),
                UserManagementAllSections = new PermissionModel(false, false),
                UserManagementOwnSection = new PermissionModel(true, true)
            };
            var queryModel = new QueryModel
            {
                CategoryId = 1,
                PageIndex = 1,
                PageSize = 10,
                User = "",
                DepartmentId = 1,
                LocationCode = "SMS",
                RoleId = 1,
                SectionId = 1
            };

            var listUser = new List<User>
            {
                new User{UserId=2, UserName="starix15", SectionId=null }
            };
            // Arrange
            var expected = new UserManagementViewModel
            {
                Users = listUser,
                CurrentPage = 1,
                TotalItem = 2,
                ItemsPerPage = 10
            };

            var userColumnModels = new List<UserColumnModel>
            {
                new UserColumnModel(userPermission,section) { HeaderText="Employee ID", Name="EmployeeId", Width=80},
                new UserColumnModel(userPermission,section) {HeaderText="Account Name", Name="AccountName", Width=150, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermission,section) { HeaderText="Full Name", Name="FullName", Width=200,  HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermission,section) {HeaderText="Nick Name", Name="NickName", Width=130,  HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermission,section) { HeaderText= "Department", Width= 120, Name= "Department", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Section", Width= 120, Name= "Section", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Group", Width= 150, Name= "Group", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Role", Width= 120, Name= "Role", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Extension", Width= 70, Name= "Extension", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Phone", Width= 120, Name= "Phone", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Email", Width= 250, Name= "Email", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Skype", Width= 120, Name= "Skype", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Category", Width= 120, Name= "Category", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Location", Width= 80, Name= "Location", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Level", Width= 80, Name= "Level", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Pickup", Width= 80, Name= "Pickup", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Address", Width= 200, Name= "Address", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Second Account", Width= 100, Name= "IsSecondAccount", HeaderAlign= "left", CellAlign= "left" }
            };

            modelService.BuildPermissionViewModel().Returns(userPermission);
            modelService.BuildUserColumnModel(Arg.Compat.Any<UserManagementPermission>(), Arg.Compat.Any<string>()).Returns(userColumnModels);

            repository.GetUserPagingAsync(Arg.Compat.Any<QueryModel>()).Returns(expected);

            var actual = await usersService.GetUserPagingAsync(queryModel);

            // Assert
            DeepAssert.Equal(actual.Users, expected.Users);
        }

        [Fact]
        public async Task GetUserPagingAsync_WithUserManagementPermission_WhenCalled_ReturnPermissionAllSections()
        {
            var section = "LST";
            // Act
            var userPermission = new UserManagementPermission
            {
                UserManagement = new PermissionModel(true, true),
                UserManagementOwnSection = new PermissionModel(true, true),
                UserManagementAllSections = new PermissionModel(true, true)
            };
            var queryModel = new QueryModel
            {
                CategoryId = 1,
                PageIndex = 1,
                PageSize = 10,
                User = "",
                DepartmentId = 1,
                LocationCode = "SMS",
                RoleId = 1,
                SectionId = 1
            };

            var listUser = new List<User>
            {
                new User{UserId=1, UserName="sa", DepartmentId=1 },
                new User{UserId=2, UserName="starix15", SectionId=1 }
            };
            // Arrange
            var expected = new UserManagementViewModel
            {
                Users = listUser,
                CurrentPage = 1,
                TotalItem = 2,
                ItemsPerPage = 10
            };

            var userColumnModels = new List<UserColumnModel>
            {
                new UserColumnModel(userPermission,section) { HeaderText="Employee ID", Name="EmployeeId", Width=80},
                new UserColumnModel(userPermission,section) {HeaderText="Account Name", Name="AccountName", Width=150, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermission,section) { HeaderText="Full Name", Name="FullName", Width=200,  HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermission,section) {HeaderText="Nick Name", Name="NickName", Width=130,  HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermission,section) { HeaderText= "Department", Width= 120, Name= "Department", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Section", Width= 120, Name= "Section", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Group", Width= 150, Name= "Group", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Role", Width= 120, Name= "Role", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Extension", Width= 70, Name= "Extension", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Phone", Width= 120, Name= "Phone", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Email", Width= 250, Name= "Email", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Skype", Width= 120, Name= "Skype", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Category", Width= 120, Name= "Category", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Location", Width= 80, Name= "Location", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Level", Width= 80, Name= "Level", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Pickup", Width= 80, Name= "Pickup", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Address", Width= 200, Name= "Address", HeaderAlign= "left", CellAlign= "left" },
                new UserColumnModel(userPermission,section) { HeaderText= "Second Account", Width= 100, Name= "IsSecondAccount", HeaderAlign= "left", CellAlign= "left" }
            };

            modelService.BuildPermissionViewModel().Returns(userPermission);
            modelService.BuildUserColumnModel(Arg.Compat.Any<UserManagementPermission>(), Arg.Compat.Any<string>()).Returns(userColumnModels);

            repository.GetUserPagingAsync(Arg.Compat.Any<QueryModel>()).Returns(expected);

            var actual = await usersService.GetUserPagingAsync(queryModel);

            // Assert
            DeepAssert.Equal(actual.Users, expected.Users);
        }
    }
}