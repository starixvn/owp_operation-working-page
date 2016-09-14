namespace Fanex.NAP.OWP.MessageMachine.Service.Interfaces
{
    using System.Collections.Generic;
    using Core.Model;
    using Data.Repository;
    using Models.MessageBox;

    public interface IMessageBoxService
    {
        IEnumerable<MessageInfo> GetMessageList(ICriteria criteria);

        OWPCommandResult UpdateMessagesStatus(ICriteria criteria);
    }
}