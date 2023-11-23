using Fanex.Data.Repository;
using System;

namespace OWP.AutoAssignment.Criteria
{
    class GetLatestRequestCriteria : CriteriaBase
    {
        public DateTime EventDate { get; set; }

        public override bool IsValid() => true;

        public override string GetSettingKey() => "OWP_AutoAssignment_GetLatestRequestByDate";
    }

}
