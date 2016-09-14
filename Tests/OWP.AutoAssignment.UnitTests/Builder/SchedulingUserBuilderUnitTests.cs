namespace OWP.AutoAssignment.UnitTests.Builder
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using AutoAssignment.Builder;
    using Const;
    using Models;
    using Xunit;
    using Xunit.Asserts.Compare;

    public class SchedulingUserBuilderUnitTests
    {
        private readonly SchedulingUserBuilder schedulingUserBuilder;

        public SchedulingUserBuilderUnitTests()
        {
            schedulingUserBuilder = new SchedulingUserBuilderImp();
        }

        [Fact]
        public void BuildListSchedulingUser_Successfully()
        {
            // Arrange
            var userInfo = new LAUserInfo
            {
                UserId = 198745,
                Level = 1,
                SpeakChinese = true,
                SpeakEnglish = false,
                Location = "VN"
            };

            var userList = new List<LAUserInfo>
            {
                userInfo
            };
            var userListWorkingShift = new List<UserWorkingShift>
            {
                new UserWorkingShift
                    {
                    UserId = 198745,
                    ShiftStartTime = DateTime.Parse("05/29/2015 5:50 AM"),
                    ShiftEndTime = DateTime.Parse("05/29/2015 5:50 PM")
                    }
            };

            var expect = new List<SchedulingLAUser>
            {
                new SchedulingLAUser
                {
                     UserId = userInfo.UserId,
                Level = userInfo.Level,
                Location = userInfo.Location ?? "",
                SpeakEnglish = userInfo.SpeakEnglish,
                SpeakChinese = userInfo.SpeakChinese,
                WorkingShifts = userListWorkingShift.Select(ws => new SchedulingWorkingShift
                {
                    InTime = ws.ShiftStartTime.ToString(AutoAssignmentConst.FormatDateTime),
                    OutTime = ws.ShiftEndTime.ToString(AutoAssignmentConst.FormatDateTime)
                }).ToArray()
                }
            };
            var userInfoTuple = new ValueTuple<IEnumerable<LAUserInfo>, IEnumerable<UserWorkingShift>>(userList, userListWorkingShift);

            // Act
            var actual = schedulingUserBuilder.BuildListSchedulingLAUser(userInfoTuple);

            // Assert
            DeepAssert.Equal(expect, actual);
        }
    }
}