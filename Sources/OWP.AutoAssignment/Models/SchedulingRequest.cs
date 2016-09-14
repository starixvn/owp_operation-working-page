namespace OWP.AutoAssignment.Models
{
    using System;
    using Enum;

    public class SchedulingRequest
    {
        public string RequestId { get; set; }

        public StatusRequest Status { get; set; }

        public DateTime EventDate { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Username { get; set; }

        public string Nickname { get; set; }
    }
}