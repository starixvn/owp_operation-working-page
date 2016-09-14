namespace OWP.AutoAssignment.Visualization.Models
{
    using System;
    using System.Collections.Generic;

    public class ExcelVisualizationModel
    {
        public DateTime EventDate { get; set; }

        public List<UserShift> UserShifts { get; set; }
    }
}