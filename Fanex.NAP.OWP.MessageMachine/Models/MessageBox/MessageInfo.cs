namespace Fanex.NAP.OWP.MessageMachine.Models.MessageBox
{
    using System;

    public class MessageInfo
    {
        public int MessageId { get; set; }

        public bool IsViewed { get; set; }

        public string MessageContent { get; set; }

        public int CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string ProfilePic { get; set; }

        public bool IsImportant { get; set; }

        public int MessageType { get; set; }

        public int SystemMessageType { get; set; }

        public string TimeSpan { get; set; }
    }
}