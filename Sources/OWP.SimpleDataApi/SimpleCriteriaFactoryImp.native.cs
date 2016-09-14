namespace OWP.SimpleDataApi
{
    using Criteria;
    using EventAssignment.Criteria;
    using LiveGameAssignment.Criteria;
    using Olympus.SimpleDataApi;

    public class SimpleCriteriaFactoryImp : SimpleCriteriaFactoryBase
    {
        static SimpleCriteriaFactoryImp()
        {
            #region QueryData

            CriteriaTypes.Add(ConstantApiKey.GetUserChangeFromAdminSite, typeof(GetUserSyncModelsCriteria));

            CriteriaTypes.Add(ConstantApiKey.WorkingShiftGetUsers, typeof(WorkingShiftQueryByUserCriteria));

            CriteriaTypes.Add(ConstantApiKey.EmployeeWorkingShiftQueryNoteById, typeof(EmployeeWorkingShiftQueryNoteByIdCriteria));

            CriteriaTypes.Add(ConstantApiKey.EmployeeWorkingShiftInsertNote, typeof(EmployeeWorkingShiftInsertNoteCriteria));

            CriteriaTypes.Add(ConstantApiKey.EmployeeWorkingShiftUpdateNote, typeof(EmployeeWorkingShiftUpdateNoteCriteria));
            #endregion QueryData

            #region UpdateData

            CommandTypes.Add(ConstantApiKey.SyncUserChangeFromAdminSite, typeof(SyncUsersCriteria));

            CommandTypes.Add(ConstantApiKey.UpdateUser, typeof(UpdateUserCriteria));

            CommandTypes.Add(ConstantApiKey.WorkingShiftUpdateSingleShift, typeof(WorkingShiftUpdateCodeCriteria));

            CommandTypes.Add(ConstantApiKey.WorkingShiftUpdateRemarkWeekly, typeof(UserRemarkUpdateCriteria));

            CommandTypes.Add(ConstantApiKey.WorkingShiftUpdateRemarkDaily, typeof(UserRemarkUpdateCriteria));

            CommandTypes.Add(ConstantApiKey.EmployeeWorkingShiftDeleteNote, typeof(EmployeeWorkingShiftDeleteNoteCriteria));

            #endregion UpdateData

            RegisterLiveGameAssignment();
        }

        private static void RegisterLiveGameAssignment()
        {
            CriteriaTypes.Add(ConstantApiKey.GetBettypeForTradingInfo, typeof(GetBettypeForTradingInfoCriteria));

            CriteriaTypes.Add(ConstantApiKey.GetBettypeForSpecialEvent, typeof(GetBettypeForSpecialEventCriteria));

            CriteriaTypes.Add(ConstantApiKey.GetSpecialEventTemplate, typeof(GetSpecialEventTemplateCriteria));

            CriteriaTypes.Add(ConstantApiKey.GetLastUpdated, typeof(GetLastUpdatedCriteria));
        }
    }
}