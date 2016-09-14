namespace OWP.MessageManagement.Models
{
    using System;
    using Attributes;
    using Newtonsoft.Json;

    public class MessageModel
    {
        public int MessageId { get; set; }

        public bool IsViewed { get; set; }

        public string MessageContent { get; set; }

        [JsonConverter(typeof(DateTimeWithoutGmtConverter))]
        public DateTime CreatedDate { get; set; }

        public bool IsImportant { get; set; }

        public int MessageType { get; set; }

        public int SystemMessageType { get; set; }
    }
}