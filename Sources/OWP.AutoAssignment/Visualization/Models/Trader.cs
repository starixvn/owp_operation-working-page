namespace OWP.AutoAssignment.Visualization.Models
{
    using System;
    using System.Collections.Generic;

    public class UserShift
    {
        public int UserId { get; set; }

        public string Username { get; set; }

        public int Level { get; set; }

        public string LevelLabel { get; set; }

        public string Group { get; set; }

        public string Role { get; set; }

        public DateTime ShiftStartTime { get; set; }

        public DateTime ShiftEndTime { get; set; }

        public string Location { get; set; }

        public string PcCode { get; set; }

        public List<VisualizedAssignment> Assignments { get; set; } = new List<VisualizedAssignment>();
    }

    public class VisualizedAssignment
    {
        public DateTime Time { get; set; }

        public string Color { get; set; }

        public string Text { get; set; }
    }

    public class InfoSiteAutoAssignment
    {
        public string PcCode { get; set; }

        public DateTime EventDateTime { get; set; }

        public int UserId { get; set; }
    }
}