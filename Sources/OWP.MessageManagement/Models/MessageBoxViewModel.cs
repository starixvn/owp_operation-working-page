namespace OWP.MessageManagement.Models
{
    using System.Collections.Generic;

    public class MessageBoxViewModel
    {
        public IList<MessageModel> Messages { get; set; }

        public int TotalRecords { get; set; }
    }
}
