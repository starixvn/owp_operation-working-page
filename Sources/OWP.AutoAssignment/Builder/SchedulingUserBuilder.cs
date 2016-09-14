namespace OWP.AutoAssignment.Builder
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Constant;
    using Models;

    public interface SchedulingUserBuilder
    {
        IEnumerable<SchedulingLAUser> BuildListSchedulingLAUser(ValueTuple<IEnumerable<LAUserInfo>, IEnumerable<UserWorkingShift>> userInfoTuple);

        IEnumerable<TraderInfo> BuildTradersInfo(IEnumerable<TraderInfo> users, IEnumerable<UserWorkingShift> workingShifts);
    }

    public class SchedulingUserBuilderImp : SchedulingUserBuilder
    {
        public IEnumerable<SchedulingLAUser> BuildListSchedulingLAUser(ValueTuple<IEnumerable<LAUserInfo>, IEnumerable<UserWorkingShift>> userInfoTuple)
        {
            var users = userInfoTuple.Item1;
            var workingShifts = userInfoTuple.Item2;
            var listSchedulingUser = new List<SchedulingLAUser>();
            foreach (var user in users)
            {
                var userWorkingShifts = workingShifts.Where(x => x.UserId == user.UserId);
                if (userWorkingShifts.Any())
                {
                    listSchedulingUser.Add(BuildSchedulingLAUser(user, userWorkingShifts));
                }
            }

            return listSchedulingUser;
        }

        public static SchedulingLAUser BuildSchedulingLAUser(LAUserInfo user, IEnumerable<UserWorkingShift> userWorkingShifts)
         => new SchedulingLAUser
         {
             UserId = user.UserId,
             Level = user.Level,
             Location = user.Location ?? "",
             SpeakEnglish = user.SpeakEnglish,
             SpeakChinese = user.SpeakChinese,
             WorkingShifts = userWorkingShifts.Any(u => u.IsShiftDeleted)
             ? new List<SchedulingWorkingShift>().ToArray()
             : userWorkingShifts.Select(ws => new SchedulingWorkingShift
             {
                 InTime = ws.ShiftStartTime.ToString(AutoAssignmentConst.FormatDateTime),
                 OutTime = ws.ShiftEndTime.ToString(AutoAssignmentConst.FormatDateTime)
             }).ToArray()
         };

        public IEnumerable<TraderInfo> BuildTradersInfo(IEnumerable<TraderInfo> users, IEnumerable<UserWorkingShift> workingShifts)
        {
            var userList = new List<TraderInfo>();
            foreach (var user in users)
            {
                var userWorkingShifts = workingShifts.Where(x => x.UserId == user.TraderId);
                if (userWorkingShifts.Any())
                {
                    user.WorkingShifts = userWorkingShifts.Select(ws => new SchedulingWorkingShift
                    {
                        InTime = ws.ShiftStartTime.ToString(AutoAssignmentConst.FormatDateTime),
                        OutTime = ws.ShiftEndTime.ToString(AutoAssignmentConst.FormatDateTime)
                    }).ToArray();

                    userList.Add(user);
                }
            }

            return userList;
        }
    }
}