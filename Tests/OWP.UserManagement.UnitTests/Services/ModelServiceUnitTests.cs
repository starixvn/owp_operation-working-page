namespace OWP.UserManagement.UnitTests.Services
{
    using System.Collections.Generic;
    using Constants;
    using Fanex.NAP.Core.Business;
    using Fanex.NAP.Core.Models.ValueObject;
    using Fanex.NAP.Core.Web.Session;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using OWP.Services;
    using UserManagement.Services;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class ModelServiceUnitTests
    {
        private readonly ModelService modelService;
        private readonly PermissionService permissionService;

        public ModelServiceUnitTests()
        {
            permissionService = Substitute.For<PermissionService>();
            var currentSession = Substitute.For<ICurrentSession>();
            currentSession.UserId = 99;
            modelService = new ModelServiceImp(permissionService);
        }

        [Fact]
        public void BuildPermissionViewModel_WithUserManagementPermission_WhenCalled_ReturnFullPermission()
        {
            // Arrange
            const string functionKey = FunctionKeys.UserManagement;
            var expected = new List<FunctionPolicy>
            {
               new FunctionPolicy
               {
                   Policy = (int)Constant.Policy.Host,
                   Key = FunctionKeys.UserManagement
               },
                new FunctionPolicy
               {
                   Policy = (int)Constant.Policy.Host,
                   Key = FunctionKeys.UserManagement_AllSections
               },
                 new FunctionPolicy
               {
                   Policy = (int)Constant.Policy.Host,
                   Key = FunctionKeys.UserManagement_OwnSection
               }
            };

            // Act
            permissionService.GetPermissions(functionKey).Returns(expected);

            var actual = modelService.BuildPermissionViewModel();

            // Assert
            Assert.True(actual.UserManagementAllSections.IsRead);
        }

        [Fact]
        public void BuildUserColumnModel_WithOnlyReadPermission_WhenCalled_ReturnExactly()
        {
            var section = "LST";
            // Arrange
            var userPermissionModel = new UserManagementPermission
            {
                UserManagementAllSections = new PermissionModel(true, false),
                UserManagementOwnSection = new PermissionModel(true, false),
            };

            // Act
            var actual = modelService.BuildUserColumnModel(userPermissionModel,section);

            // Assert
            var expected = new List<UserColumnModel>
            {
                new UserColumnModel(userPermissionModel,section) { HeaderText="Employee ID", Name="EmployeeId", Width=80, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText="Account Name", Name="UserName", Width=150, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText="Full Name", Name="FullName", Width=200, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText="Nick Name", Name="NickName", Width=130, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Department", Width= 120, Name= "DepartmentName", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Section", Width= 120, Name= "SectionName", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Group", Width= 150, Name= "GroupName", HeaderAlign="left", CellAlign="left" },
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Role", Width= 120, Name= "RoleName", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Extension", Width= 70, Name= "Extension", HeaderAlign="left", CellAlign="left" },
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Phone", Width= 120, Name= "Phone", HeaderAlign="left", CellAlign="left" },
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Email", Width= 250, Name= "Email", HeaderAlign="left", CellAlign="left" },
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Skype", Width= 120, Name= "Skype", HeaderAlign="left", CellAlign="left" },
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Category", Width= 120, Name= "CategoryName", HeaderAlign="left", CellAlign="left" },
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Location", Width= 90, Name= "LocationCode", HeaderAlign="left", CellAlign="left" },
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Level", Width= 80, Name= "LevelName", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Pickup", Width= 80, Name= "Pickup", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Address", Width= 200, Name= "Address", HeaderAlign="left", CellAlign="left" },
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Second Account", Width= 100, Name= "IsSecondAccount", HeaderAlign="left", CellAlign="left" },
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Language", Width= 120, Name= "Languages", HeaderAlign="left", CellAlign="left"}
            };


            DeepAssert.Equal(actual, expected);
        }

        [Fact]
        public void BuildUserColumnModel_ExistHostPermission_WhenCalled_ReturnExactly()
        {
            var section = "LST";
            // Arrange
            var userPermissionModel = new UserManagementPermission
            {
                UserManagementAllSections = new PermissionModel(true,true),
                UserManagementOwnSection = new PermissionModel(true,true)
            };

            // Act
            var actual = modelService.BuildUserColumnModel(userPermissionModel, section);

            // Assert
            var expected = new List<UserColumnModel>
            {
                new UserColumnModel(userPermissionModel,section) { HeaderText="Employee ID", Name="EmployeeId", Width=80, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText="Account Name", Name="UserName", Width=150, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText="Full Name", Name="FullName", Width=200, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText="Nick Name", Name="NickName", Width=130, HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Department", Width= 120, Name= "DepartmentName", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Section", Width= 120, Name= "SectionName", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Group", Width= 150, Name= "GroupName", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Role", Width= 120, Name= "RoleName", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Extension", Width= 70, Name= "Extension", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Phone", Width= 120, Name= "Phone", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Email", Width= 250, Name= "Email", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Skype", Width= 120, Name= "Skype", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Category", Width= 120, Name= "CategoryName", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Location", Width= 90, Name= "LocationCode", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Level", Width= 80, Name= "LevelName", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Pickup", Width= 80, Name= "Pickup", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Address", Width= 200, Name= "Address", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Second Account", Width= 100, Name= "IsSecondAccount", HeaderAlign="left", CellAlign="left"},
                new UserColumnModel(userPermissionModel,section) { HeaderText= "Language", Width= 120, Name= "Languages", HeaderAlign="left", CellAlign="left"}
            };
            DeepAssert.Equal(actual, expected);
        }
    }
}