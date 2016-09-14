namespace OWP.AutoAssignment.Models
{
    using System;

    public class UserWorkingShift
    {
        public int UserId { get; set; }

        public DateTime ShiftStartTime { get; set; }

        public DateTime ShiftEndTime { get; set; }

        public bool IsShiftDeleted { get; set; }
    }
}
