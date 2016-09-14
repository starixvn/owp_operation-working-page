namespace Fanex.NAP.OWP.TaskScheduling.Models.EventAssignment
{
    using System.Collections.Generic;
    using global::OWP.Models;

    public class MessageUser
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public IList<Message> Messages { get; set; }
    }
}