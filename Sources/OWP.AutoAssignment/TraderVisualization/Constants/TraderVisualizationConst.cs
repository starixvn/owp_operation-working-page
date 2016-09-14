namespace OWP.AutoAssignment.TraderVisualization.Constants
{
    using System.Collections.Generic;

    public static class BackgroundColor
    {
        public static readonly string WorkingShift = "#a6a6a6";

        public static readonly string MainMatch2To20K = "#5E8533";

        public static readonly string MainMatch25To40K = "#A37B00";

        public static readonly string MainMatchOver50K = "#6282A3";

        public static readonly string FirstStHalf = "#72667F";

        public static readonly string FantasyMatch = "#937675";

        public static readonly string Corner = "#7B0000";

        public static readonly string FtLink2G = "#A34262";

        public static readonly string ETPK = "#262626";

        public static readonly string SaBa5Mins = "#481E66";

        public static readonly string SaBa15Mins = "#A3A382";

        public static readonly string SaBa20Mins = "#A3A382";

        public static readonly string SaBaLink2G = "#A34262";

        public static readonly string SaBa6Mins = "#00A382";

        public static readonly string SaBaM88 = "#A28873";

        public static readonly string SaBa16Mins = "#007133";

        public static readonly string SupOrLeaderRole = "#4db8ff";

        public static readonly Dictionary<int, string> SaBaTypeColor = new Dictionary<int, string>
        {
            { 1, SaBa15Mins },
            { 2, SaBa20Mins },
            { 3, SaBa16Mins},
            { 4, SaBa6Mins },
            { 5, SaBaM88},
            { 6, SaBa5Mins},

        };
    }

    public static class EtPkConst
    {
        public static readonly string Nm = "NM";

        public static readonly string EtPk = "ETPK";

        public static readonly string Pk = "PK";

        public static readonly string Et = "ET";

        public static readonly string NmValue = string.Empty;

        public static readonly string EtPkValue = "ET/PK";

        public static readonly string PkValue = "PK";

        public static readonly string EtValue = "ET";

        public static readonly Dictionary<string, string> EtPkDict = new Dictionary<string, string>
        {
            { Nm, NmValue },
            { EtPk, EtPkValue },
            { Pk, PkValue},
            { Et , EtValue }
        };
    }

    public static class BetType
    {
        public static readonly int MainMatch = 0;

        public static readonly int NoCorner = -3;

        public static readonly int NextCorner = -4;
    }

    public static class Group
    {
        public static readonly string MainMatch = "FT";

        public static readonly string NoCorner = "Corners";

        public static readonly string NextCorner = "FT_Corners";
    }

    public static class MaxBetMainMatch
    {
        public static readonly (decimal, decimal) From2KTo20K = (2000, 20000);

        public static readonly (decimal, decimal) From25KTo40K = (25000, 40000);

        public static readonly decimal Over50K = 50000;
    }

    public static class RuleType
    {
        public const int MainMatch = 0;

        public const int Corner = 1;

        public const int Fantasy = 2;

        public const int SabaMatch = 4;
    }
}
