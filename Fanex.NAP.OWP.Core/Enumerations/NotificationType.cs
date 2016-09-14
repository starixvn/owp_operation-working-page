namespace Fanex.NAP.OWP.Core.Enumerations
{
    using System.ComponentModel;
    using System.Diagnostics.CodeAnalysis;

    [SuppressMessage("Microsoft.Design", "CA1008:EnumsShouldHaveZeroValue", Justification = "Reviewed.")]
    public enum NotificationType
    {
        [Description("Success")]
        Success = 1,

        [Description("Information")]
        Information = 2,

        [Description("Warning")]
        Warning = 3,

        [Description("Error")]
        Error = 4,

        [Description("Assignment")]
        Assignment = 5,

        [Description("Remove Assignment")]
        RemoveAssignment = 6
    }
}