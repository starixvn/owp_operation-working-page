namespace OWP.AutoAssignment.Constant
{
    using System.Collections.Generic;

    public static class AutoAssignmentConst
    {
        public const string NoFindAnyMatchValidOnSelectedDate = "There is no matches in selected date";

        public const string Exists = "There is no matches in selected date";

        public const string ExistsRequestIdIsWaiting = "Please wait request: {0} is completed";

        public const string NoFindAnyTraderValidOnSelectedDate = "There is no users in selected date";

        public const string FormatDateTime = "yyyy-MM-dd'T'HH:mm:ss";

        /// <summary>
        /// FT: (main match) + 10mins + 15mins + Home Single Team OU + Away Single Team OU + Next Goal Kick + Winner
        /// </summary>
        public static readonly List<int> GroupFullTime = new List<int> { 0, -1, -2, -92, -93, -100, -14 };

        /// <summary>
        /// Group Bookings: Total Bookings + Next Booking + Last Booking + 15mins Booking
        /// </summary>
        public static readonly List<int> GroupBooking = new List<int> { -6, -7, -91, -8 };

        /// <summary>
        /// Group Corners: No. of Corners + Next Corner + Last Corner + 15mins Corners + Home Single Team OU No. of Corners + Away Single Team OU No. of Corners
        /// </summary>
        public static readonly List<int> GroupCorners = new List<int> { -3, -4, -90, -5, -94, -95 };

        public static readonly List<int> AllGroup = new List<int> { 0, -1, -2, -92, -93, -100, -14 ,
                                                    -6, -7, -91, -8,
                                                    -3, -4, -90, -5, -94, -95};

        public const string MatchStatusIds = "1,2,3,4,5,6";

        public const string GroupFTLabel = "FT";
        public const string GroupBookingLabel = "Booking";
        public const string GroupCornerLabel = "Corner";
        public const string GroupOtherLabel = "Other";

        public const string EtPk = "ETPK";
        public const string Et = "ET";
        public const string Pk = "PK";
        public const string Nomal = "NM";


    }
}