namespace Fanex.NAP.OWP.MessageMachine.Service.Implement
{
    using System;
    using System.Collections.Generic;
    using Core.BaseClasses;
    using Core.Model;
    using Data.Repository;
    using Interfaces;
    using Models.MessageBox;

    public class MessageBoxService : OWPBaseService, IMessageBoxService
    {
        public IEnumerable<MessageInfo> GetMessageList(ICriteria criteria)
        {
            IEnumerable<MessageInfo> messages = new List<MessageInfo>();

            if (criteria != null && criteria.IsValid())
            {
                messages = GetData<MessageInfo>(criteria);

                foreach (var message in messages)
                {
                    message.TimeSpan = ConvertToTimeSpan(message.CreatedDate);
                }
            }

            return messages;
        }

        public OWPCommandResult UpdateMessagesStatus(ICriteria criteria)
        {
            var commandResult = new OWPCommandResult();

            if (criteria != null && criteria.IsValid())
            {
                commandResult = Repository.UpdateData(criteria);
            }

            return commandResult;
        }

        private static string ConvertToTimeSpan(DateTime createdDate)
        {
            string result;
            var timeSpan = DateTime.Now - createdDate;

            if (timeSpan.Days != 0)
            {
                result = timeSpan.Days + " days ago";
            }
            else if (timeSpan.Hours != 0)
            {
                result = timeSpan.Hours + " hours ago";
            }
            else if (timeSpan.Minutes != 0)
            {
                result = timeSpan.Minutes + " minutes ago";
            }
            else
            {
                result = timeSpan.Seconds + " seconds ago";
            }

            return result;
        }
    }
}