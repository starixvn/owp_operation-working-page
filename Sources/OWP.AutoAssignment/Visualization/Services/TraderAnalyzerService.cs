namespace OWP.AutoAssignment.Visualization.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoAssignment.Models;
    using Models;

    public interface TraderAnalyzerService
    {
        Task<IEnumerable<UserShift>> GetFilteredUsersByDate(SchedulingRequest request);

        Task<IEnumerable<UserShift>> GetFilteredUsersRealAssignmentByDate(DateTime eventDate, IEnumerable<UserShift> autoAssignmentUsers);
    }

    public class TraderAnalyzerServiceImp : TraderAnalyzerService
    {
        private readonly Repository repository;

        public TraderAnalyzerServiceImp(
            Repository repository)
        {
            this.repository = repository;
        }

        public async Task<IEnumerable<UserShift>> GetFilteredUsersByDate(SchedulingRequest request)
        {
            var users = await repository.GetUsersByDate(request.EventDate, request.RequestId);
            var napUserIds = await repository.GetUserInfoFromNAPUserControl();
            var db02CustIds = await repository.GetCustInfoFromDB02();
            var filteredUsers = users.Item1.Where(x => napUserIds.Any(y => y == x.UserId) && db02CustIds.Any(y => y == x.UserId));
            var filteredPcCode = users.Item2.Where(x => filteredUsers.Any(y => y.UserId == x.UserId));

            return GetPcCode(filteredUsers, filteredPcCode);
        }

        public async Task<IEnumerable<UserShift>> GetFilteredUsersRealAssignmentByDate(DateTime eventDate, IEnumerable<UserShift> autoAssignmentUsers)
        {
            var users = await repository.GetUsersByDate(eventDate.AddDays(-1), string.Empty);
            var filteredUsers = users.Item1.Where(x => autoAssignmentUsers.Any(y => y.UserId == x.UserId));
            var filteredPcCode = users.Item2.Where(x => filteredUsers.Any(y => y.UserId == x.UserId));

            return GetPcCode(filteredUsers, filteredPcCode);
        }

        public static IEnumerable<UserShift> GetPcCode(IEnumerable<UserShift> filteredUsers, IEnumerable<InfoSiteAutoAssignment> filteredPcCode)
        {
            foreach (var user in filteredUsers)
            {
                user.PcCode = filteredPcCode.FirstOrDefault(x => x.UserId == user.UserId
                                                                 && x.EventDateTime >= user.ShiftStartTime
                                                                 && x.EventDateTime <= user.ShiftEndTime)?.PcCode;

                yield return user;
            }
        }
    }
}