namespace OWP.DailyWorkingShift.ViewModels
{
    using System;
    using System.Collections.Generic;
    using Models;
    using OWP.Models;

    public class DailyViewModel
    {
        public DateTime Date { get; set; }

        public IEnumerable<ReferenceResource> Sections { get; set; }

        public IEnumerable<ReferenceResource> Departments { get; set; }

        public IEnumerable<UserLocation> UserLocations { get; set; }

        public DailyWorkingShiftPermission Permission { get; set; }

        public string Username { get; set; }
    }
}