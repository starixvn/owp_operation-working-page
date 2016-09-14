
using Fanex.Data.Repository;

namespace Fanex.NAP.OWP.EventManagement.Criteria.EventInfo
{
    public class GetTicketListCriteria : CriteriaBase
    {
        public int ActorId { get; set; }

        public string OWPMatchIds { get; set; }

        public override bool IsValid()
        {
            return ActorId > 0 ;
        }
        public override string GetSettingKey()
        {
            return "OWP_TicketEvent_GetTicketByOwpMatchId";
        }
    }
}
