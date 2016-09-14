namespace Fanex.NAP.OWP.Core.Enumerations
{
    using System.ComponentModel;
    using System.Diagnostics.CodeAnalysis;

    [SuppressMessage("Microsoft.Design", "CA1008:EnumsShouldHaveZeroValue", Justification = "Reviewed.")]
    public enum SystemMessageType
    {
        [Description("Notification")]
        Notification = 1,

        [Description("Announcement")]
        Announcement = 2,

        [Description("Message")]
        Message = 3
    }
}