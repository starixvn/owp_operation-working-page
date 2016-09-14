namespace OWP.AutoAssignment.Models
{
    public class SchedulingLAUser : LAUserInfo
    {
        public bool InLineWithTV { get; } = true;

        public SchedulingWorkingShift[] WorkingShifts { get; set; }
    }
}