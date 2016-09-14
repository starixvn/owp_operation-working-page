using System.Collections.Generic;

namespace OWP.AutoAssignment.Visualization.Consts
{
    public static class AssignmentType
    {
        public const string MainMatch = "FT";
        public const string Corner = "Corners";
        public const string TwoInOneMatch = "FT_Corners";
        public const string FantasyMatch = "Fantasy";
        public const string TotalBookingMatch = "Booking";
        public const string NextGoalKickMatch = "RB2";
        public const string ETPKOrPKtime = "RB3";
        public const string MainMatchRB2 = "RB2";
        public const string MainMatchRB3 = "RB3";
        public const string MainMatchRB4 = "RB4";
        public const string MainMatchRB5 = "RB5";
        public const string MainMatchRB6 = "RB6";
        public const string SABA5Mins = "SABA5Mins";
        public const string SABA15Mins = "SABA15Mins";
        public const string SABA20Mins = "SABA20Mins";
        public const string SABA16Mins = "SABA16Mins";
        public const string SABA6Mins = "SABA6Mins";
        public const string SABAM88 = "SABAM88";
        public const string Other = "Other";
    }

    public static class BackgroundColor
    {
        public static readonly string WorkingShift = "#a6a6a6";
        public static readonly string MainMatch = "#92d050";
        public static readonly string Corner = "#c00000";
        public static readonly string TwoInOneMatch = "#1f497d";
        public static readonly string FantasyMatch = "#e6b8b7";
        public static readonly string TotalBookingMatch = "#ffff00";
        public static readonly string NextGoalKickMatch = "#0fc";
        public static readonly string ETPKOrPKtime = "#262626";
        public static readonly string MainMatchRB2 = "#ff6699";
        public static readonly string MainMatchRB3 = "#ffc000";
        public static readonly string MainMatchRB4 = "#33cccc";
        public static readonly string MainMatchRB5 = "#00b050";
        public static readonly string MainMatchRB6 = "#fcd5b4";
        public static readonly string SupOrLeaderRole = "#4db8ff";
        public static readonly string SABA5Mins = "#7030A0";
        public static readonly string SABA15Mins = "#F79646";
        public static readonly string SABA20Mins = "#00B0F0";
        public static readonly string SABA16Mins = "#00B050";
        public static readonly string SABA6Mins = "#00FFCC";
        public static readonly string SABAM88 = "#FCD5B4";

        public static readonly Dictionary<string, string> ColorByGroupName = new Dictionary<string, string>
        {
            { AssignmentType.MainMatch, MainMatch },
            { AssignmentType.Corner, Corner },
            { AssignmentType.TwoInOneMatch, TwoInOneMatch },
            { AssignmentType.FantasyMatch, FantasyMatch },
            { AssignmentType.TotalBookingMatch, TotalBookingMatch },
            { AssignmentType.MainMatchRB2, MainMatchRB2 },
            { AssignmentType.MainMatchRB3, MainMatchRB3 },
            { AssignmentType.MainMatchRB4, MainMatchRB4 },
            { AssignmentType.MainMatchRB5, MainMatchRB5 },
            { AssignmentType.MainMatchRB6, MainMatchRB6 },
            { AssignmentType.SABA5Mins, SABA5Mins },
            { AssignmentType.SABA15Mins, SABA15Mins },
            { AssignmentType.SABA20Mins, SABA20Mins },
            { AssignmentType.SABA16Mins, SABA16Mins },
            { AssignmentType.SABA6Mins, SABA6Mins },
            { AssignmentType.SABAM88, SABAM88 },
        };
    }

    public static class ExcelConst
    {
        public static readonly string TemplateName = "LA TimeTable";

        public static readonly string SheetName = "TimeTable";

        public static readonly int OWPAddTime = 12;

        public static readonly int StartRowIndex = 3;

        public static readonly int DateColIndex = 2;

        public static readonly int DateRowIndex = 1;

        public static readonly int TimeColIndex = 1;

        public static readonly int GroupColIndex = 2;

        public static readonly int NameColIndex = 3;

        public static readonly int LocationColIndex = 4;

        public static readonly int PcCodeColIndex = 5;

        public static readonly int LevelColIndex = 6;

        public static readonly Dictionary<string, int> RealAssignmentTimeColIndex = new Dictionary<string, int>
        {
            { "04:00 AM", 7  },
            { "05:00 AM", 8  },
            { "06:00 AM", 9 },
            { "07:00 AM", 10},
            { "08:00 AM", 11},
            { "09:00 AM", 12 },
            { "10:00 AM", 13 },
            { "11:00 AM", 14 },
        };

        public static readonly Dictionary<string, int> AutoAssignmentTimeColIndex = new Dictionary<string, int>
        {
            { "12:00 PM", 15 },
            { "01:00 PM", 16 },
            { "02:00 PM", 17 },
            { "03:00 PM", 18 },
            { "04:00 PM", 19 },
            { "05:00 PM", 20 },
            { "06:00 PM", 21 },
            { "07:00 PM", 22 },
            { "08:00 PM", 23 },
            { "09:00 PM", 24 },
            { "10:00 PM", 25 },
            { "11:00 PM", 26 },
            { "12:00 AM", 27 },
            { "01:00 AM", 28 },
            { "02:00 AM", 29 },
            { "03:00 AM", 30 },
            { "04:00 AM", 31 },
            { "05:00 AM", 32 },
            { "06:00 AM", 33 },
            { "07:00 AM", 34 },
            { "08:00 AM", 35 },
            { "09:00 AM", 36 },
            { "10:00 AM", 37 },
            { "11:00 AM", 38 }
        };

        public static readonly Dictionary<string, int> AutoAssignmentTimeNextDayColIndex = new Dictionary<string, int>
        {
            { "12:00 PM", 39 },
            { "01:00 PM", 40 },
            { "02:00 PM", 41 }
        };
    }

    public static class BettypeConst
    {
        public static readonly int NoOfCorner = -3;

        public static readonly int NextCorner = -4;

        public static readonly int NoOfCorner15Mins = -5;

        public static readonly int SingleTeamOUOfCorners = -10;

        public static readonly int LastCorner = -90;

        public static readonly int HomeSingleTeamOUOfCorners = -94;

        public static readonly int AwaySingleTeamOUOfCorners = -95;

        public static readonly int TotalBooking = -6;

        public static readonly int NextBooking = -7;

        public static readonly int TotalBooking15Mins = -8;

        public static readonly int NextGoalKick = -100;

        public static readonly int LastGoalKick = -101;

        public static readonly int SecondHaft1stGoalKick = -102;
    }
}