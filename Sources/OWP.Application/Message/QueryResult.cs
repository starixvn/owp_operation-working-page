namespace OWP.Application.Message
{
    using System.Collections.Generic;

    public class QueryResult
    {
        public IEnumerable<MessageModel> Messages { get; set; }

        public int TotalNotViewMessage { get; set; }
    }
}
