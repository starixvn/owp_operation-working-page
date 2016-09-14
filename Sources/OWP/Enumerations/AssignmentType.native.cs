namespace OWP.Enumerations
{
    using System.ComponentModel;
    using System.Diagnostics.CodeAnalysis;

    [SuppressMessage("Microsoft.Design", "CA1008:EnumsShouldHaveZeroValue", Justification = "Reviewed.")]
    public enum AssignmentType
    {
        [Description("Main Trader")]
        Main = 1,

        [Description("Others Trader")]
        Others = 2
    }
}
