namespace OWP.AutoAssignment.TraderVisualization.Constants
{
    public static class ExcelConst
    {
        public static readonly string TraderTemplatePath = @"App_Data\Templates\TraderAutoAssignmentTimeTableTemplate.xlsx";
        public const int ReportSheetIndex = 0;
        public const int DefaultRowData = 3; // insert data begin row 3
        public const int DefaultColStartShift = 7; // insert time shift begin col 7
        public const int DefaultMaxColEndShift = 41;
        public const int DefaultHourStartShift = 4;
        public const int EventDateRowIndex = 1;
        public const int EventDateColIndex = 2;
        public const int RangeTimeColIndex = 1;
        public const int GroupColIndex = 2;
        public const int UserNameColIndex = 3;
        public const int LocationColIndex = 4;
        public const int MainBetTypeColIndex = 5;
        public const int LevelColIndex = 6;
    }
}
