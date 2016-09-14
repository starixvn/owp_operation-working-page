namespace OWP.AutoAssignment.Criteria
{
    using System;
    using Fanex.Data.Repository;

    public class GetAutoUserResult : CriteriaBase
    {
        public DateTime EventDate { get; set; }

        public override bool IsValid() => true;

        public override string GetSettingKey() => "OWP_AutoAssignment_GetAutoUserResult";
    }
}