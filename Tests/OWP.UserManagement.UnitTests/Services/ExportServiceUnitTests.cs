namespace OWP.UserManagement.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using Models;
    using NSubstitute;
    using OWP.Models;
    using UserManagement.Services;
    using Xunit;

    public class ExportServiceUnitTests
    {
        private readonly ModelService modelService;
        private readonly ExportService exportService;

        public ExportServiceUnitTests()
        {
            modelService = Substitute.For<ModelService>();
            exportService = new ExportServiceImp(modelService);
        }

        [Fact]
        public void Export_WhenCall_Successfully()
        {
            var section = "";
            // Act
            var userPermission = new UserManagementPermission
            {
                UserManagement = new PermissionModel(true, true),
                UserManagementAllSections = new PermissionModel(true, true),
                UserManagementOwnSection = new PermissionModel(true, true)
            };
            var users = new List<User>
            {
                new User
                {
                    EmployeeId="1234",
                    UserName="Kane",
                    FullName="Le Thanh Tuan",
                    NickName="Kane",
                    DepartmentName="Development",
                    SectionName="Dev",
                    GroupName="Olympus",
                    RoleName="Employeer",
                    Phone="1234567890"
                },
                new User
                {
                    EmployeeId="1232",
                    UserName="Kane1",
                    FullName="Le Thanh Tuan",
                    NickName="Kane1",
                    DepartmentName="Development",
                    SectionName="Dev",
                    GroupName="Olympus",
                    RoleName="Employeer",
                    Phone="123456795"
                }
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
            modelService.BuildUserColumnModel(userPermission,section).Returns(userColumnModels);

            var exportDate = DateTime.Now;
            using (var stream = new MemoryStream())
            {
                exportService.ExportToExcel(stream, users, exportDate);
            }
        }
    }
}
