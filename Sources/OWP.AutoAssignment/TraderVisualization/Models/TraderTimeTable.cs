using System;
using System.Collections.Generic;

namespace OWP.AutoAssignment.TraderVisualization.Models
{
    public class TraderTimeTable
    {
        public DateTime EventDate { get; set; }

        public List<TraderInfo> Traders { get; set; }
    }
}