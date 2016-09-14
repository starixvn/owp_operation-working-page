namespace Fanex.NAP.OWP.Core.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using Configuration;
    using global::OWP.Resources;
    using Model;

    public static class HelperService
    {
        private const string DateFormat = "MMM dd, yyyy";
        private const string TimeFormat = "hh:mm tt";
        private const int TimeZoneOffsetGMT8 = 0;

        public static string GetViewLangeByKey(string key)
        {
            return ViewLang.ResourceManager.GetString(key);
        }

        public static string BuildDisplayMaxbetSpread(decimal? maxBet, decimal? spread)
        {
            var maxbetDisplay = maxBet.ToOWPMaxBetFormat();
            var spreadDisplay = spread.ToOWPSpreadFormat();
            if (string.IsNullOrEmpty(maxbetDisplay) && string.IsNullOrEmpty(spreadDisplay))
            {
                return string.Empty;
            }

            return string.Format(
                CultureInfo.InvariantCulture,
                "{0} {1}",
                maxbetDisplay,
                !string.IsNullOrWhiteSpace(spreadDisplay) ? string.Format(CultureInfo.InvariantCulture, "({0}%)", spreadDisplay) : string.Empty);
        }

        public static string ToOWPDateFormat(this DateTime date)
        {
            return date.ToString(DateFormat, CultureInfo.InvariantCulture);
        }

        public static string ToOWPTimeFormat(this TimeSpan time)
        {
            var date = new DateTime(1, 1, 1, time.Hours, time.Minutes, 0);

            return date.ToString(TimeFormat, CultureInfo.InvariantCulture);
        }

        public static DateTime ToOWPDate(this DateTime date)
        {
            var timezone = int.Parse(AppSettings.ClientTimezone, CultureInfo.InvariantCulture);

            return date.ToUniversalTime().AddHours(timezone);
        }

        public static string ToKOTimeDateFormat(this DateTime date)
        {
            return date.ToString("dd-MMM", CultureInfo.InvariantCulture);
        }

        public static string ToOWPMaxBetFormat(this decimal? maxbet)
        {
            return maxbet.HasValue ? (maxbet.Value / 1000).ToString("0.####", CultureInfo.InvariantCulture) + "K" : string.Empty;
        }

        public static string ToOWPSpreadFormat(this decimal? spread)
        {
            return spread.HasValue ? (spread.Value * 100).ToString("0.##", CultureInfo.InvariantCulture) : string.Empty;
        }

        public static ShiftTimeSpan ParseShiftTimeSpan(string shiftCode, int? timeZoneOffset)
        {
            var shiftCodes = shiftCode.Split('>');
            if (shiftCodes.Length == 2)
            {
                TimeSpan startTime;
                TimeSpan endTime;
                var isValidStartTime = TryParseTimeInShiftCode(shiftCodes[0], out startTime);
                var isValidEndTime = TryParseTimeInShiftCode(shiftCodes[1], out endTime);
                if (isValidStartTime && isValidEndTime)
                {
                    var getStartTime = startTime.Add(new TimeSpan(0, -timeZoneOffset ?? 0, 0));
                    var getEndTime = endTime.Add(new TimeSpan(0, -timeZoneOffset ?? 0, 0));

                    return new ShiftTimeSpan
                    {
                        StartTime = new TimeSpan(getStartTime.Hours, getStartTime.Minutes, 0),
                        EndTime = new TimeSpan(getEndTime.Hours, getEndTime.Minutes, 0)
                    };
                }
            }

            return null;
        }

        public static ShiftTimeSpan ParseShiftTimeSpan(string shiftCode)
        {
            return ParseShiftTimeSpan(shiftCode, TimeZoneOffsetGMT8);
        }

        private static bool TryParseTimeInShiftCode(string timeText, out TimeSpan timeSpan)
        {
            int hour;
            int minute;
            string textHour;
            string textMinute;

            var hourAndMinute = timeText.Split(':');
            if (hourAndMinute.Length == 2)
            {
                textHour = hourAndMinute[0];
                textMinute = hourAndMinute[1];
            }
            else
            {
                textHour = timeText;
                textMinute = "0";
            }

            var isValidHour = int.TryParse(textHour, out hour);
            var isValidMinute = int.TryParse(textMinute, out minute);

            if (!isValidHour || !isValidMinute)
            {
                timeSpan = TimeSpan.Zero;
                return false;
            }

            if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60)
            {
                timeSpan = new TimeSpan(hour, minute, 0);
                return true;
            }

            timeSpan = TimeSpan.Zero;
            return false;
        }

        public static bool IsBasicType(Type t)
        {
            var temp = t;

            if (t != null && t.IsGenericType && t.GetGenericTypeDefinition() == typeof(IEnumerable<>))
            {
                temp = t.GetGenericArguments()[0];
            }

            return temp == typeof(int) || temp == typeof(double) || temp == typeof(string) || temp == typeof(DateTime);
        }
    }
}