using System;

namespace OWP.AutoAssignment.TraderVisualization.Models
{
    using System.Collections.Generic;

    public class TraderInfo
    {
        public int UserId { get; set; }

        public string LevelLabel { get; set; }

        public string Username { get; set; }

        public int Level { get; set; }

        public string Group { get; set; }

        public string Role { get; set; }

        public DateTime ShiftStartTime { get; set; }

        public DateTime ShiftEndTime { get; set; }

        public string Location { get; set; }

        public string MainBettype { get; set; }

        public List<Assignment> Assignments { get; set; } = new List<Assignment>();

        public String RangeShiftTime => $"{ShiftStartTime:HH} > "
                                        + $"{(ShiftEndTime.Minute == 0 ? ShiftEndTime : ShiftEndTime.AddHours(1)):HH}";
    }

    public class Assignment
    {
        public DateTime Time { get; set; }

        public string Color { get; set; }

        public string Text { get; set; }

        public Assignment()
        {
        }

        public Assignment(DateTime time, String color)
        {
            Time = time;
            Color = color;
            Text = string.Empty;
        }

        public Assignment(DateTime time, String color, string text)
        {
            Time = time;
            Color = color;
            Text = text;
        }
    }
}
