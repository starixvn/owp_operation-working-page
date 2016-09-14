namespace Fanex.NAP.OWP.Core.Constants
{
    using System.Diagnostics.CodeAnalysis;

    [SuppressMessage("Microsoft.Design", "CA1008:EnumsShouldHaveZeroValue", Justification = "Reviewed.")]
    public enum RuleReturnType
    {
        Failed = 1,
        WarningMajor = 2,
        Passed = 3,
        WarningMinor = 4
    }
}