using OWP.AutoAssignment.Constant;

namespace OWP.AutoAssignment.Helper
{
    public static class EtPkHelper
    {
        public static string DetectEtPkByExtraTime(string group, string extraTime)
        {

            var isGroupCornerOrBooking = string.Equals(group, AutoAssignmentConst.GroupCornerLabel)
               || string.Equals(group, AutoAssignmentConst.GroupBookingLabel);

            if (isGroupCornerOrBooking)
            {
                return DetectEtPkGroupCornerOrBooking(extraTime);
            }

            return DetectEtPkGroupFtOrOther(extraTime);
        }

        private static string DetectEtPkGroupCornerOrBooking(string extraTime)
        {
            if (extraTime.CaseInsensitiveContains(AutoAssignmentConst.Et))
            {
                return AutoAssignmentConst.Et;
            }
            return AutoAssignmentConst.Nomal;
        }

        private static string DetectEtPkGroupFtOrOther(string extraTime)
        {
            if (extraTime.CaseInsensitiveContains(AutoAssignmentConst.Et))
            {
                return AutoAssignmentConst.EtPk;
            }

            if (extraTime.CaseInsensitiveContains(AutoAssignmentConst.Pk))
            {
                return AutoAssignmentConst.Pk;
            }

            return AutoAssignmentConst.Nomal;
        }
    }
}
