namespace OWP.AutoAssignment.Models
{
    using System;
    using Newtonsoft.Json;

    public class RequestSender
    {
        public string Action { get; set; }

        [JsonIgnore]
        public DateTime EventDate { get; set; }

        public string RequestId { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsReRun { get; set; }

        public DataHolder DataHolder { get; set; }
    }
}