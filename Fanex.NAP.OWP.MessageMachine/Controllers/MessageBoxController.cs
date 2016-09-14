namespace Fanex.NAP.OWP.MessageMachine.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Core.BaseClasses;
    using Core.BaseClasses.Interfaces;
    using Criteria.MessageBox;
    using Models.MessageBox;
    using Service.Interfaces;

    public class MessageBoxController : OWPBaseController
    {
        private readonly IMessageBoxService messageBoxService;

        public MessageBoxController(
            IMessageBoxService messageBoxService,
            IOWPBaseService baseService)
        {
            BaseService = baseService;
            this.messageBoxService = messageBoxService;
        }

        public JsonResult GetListMessage(GetMessageByUserIdCriteria criteria)
        {
            if (criteria != null)
            {
                criteria.UserId = CurrentSession.UserId;
            }

            IEnumerable<MessageInfo> messages = messageBoxService.GetMessageList(criteria).ToList();

            return Json(new {criteria?.TotalNotViewMessage, Messages = messages }, JsonRequestBehavior.AllowGet);
        }

        [HttpPut]
        public JsonResult UpdateMessagesStatus(UpdateMessagesStatusCriteria criteria)
        {
            if (criteria != null)
            {
                criteria.UserId = CurrentSession.UserId;
            }

            var result = messageBoxService.UpdateMessagesStatus(criteria);

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}