namespace OWP.SimpleDataApi
{
    using Constants;
    using Fanex.NAP.Core.Business;
    using Olympus.SimpleDataApi;

    public class SimpleFunctionPermissionFactoryImp : SimpleFunctionPermissionFactoryBase
    {
        static SimpleFunctionPermissionFactoryImp()
        {
            AddFunctionPermission(ConstantApiKey.WorkingShiftGetUsers, FunctionKeys.WorkingShiftManagement, Constant.Policy.Read);
            AddFunctionPermission(ConstantApiKey.WorkingShiftUpdateSingleShift, FunctionKeys.WorkingShiftManagement, Constant.Policy.Host);
            AddFunctionPermission(ConstantApiKey.WorkingShiftUpdateRemarkWeekly, FunctionKeys.WorkingShiftManagement, Constant.Policy.Host);
            AddFunctionPermission(ConstantApiKey.WorkingShiftUpdateRemarkDaily, FunctionKeys.DailyWorkingShift, Constant.Policy.Host);
            AddFunctionPermission(ConstantApiKey.EmployeeWorkingShiftInsertNote, FunctionKeys.DailyWorkingShift, Constant.Policy.Host);
            AddFunctionPermission(ConstantApiKey.EmployeeWorkingShiftDeleteNote, FunctionKeys.DailyWorkingShift, Constant.Policy.Host);
            AddFunctionPermission(ConstantApiKey.GetUserChangeFromAdminSite, FunctionKeys.UserManagement, Constant.Policy.Host);
            AddFunctionPermission(ConstantApiKey.SyncUserChangeFromAdminSite, FunctionKeys.UserManagement, Constant.Policy.Host);
        }
    }
}