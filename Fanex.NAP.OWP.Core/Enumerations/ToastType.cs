namespace Fanex.NAP.OWP.Core.Enumerations
{
    using System.Diagnostics.CodeAnalysis;

    [SuppressMessage("Microsoft.Design", "CA1008:EnumsShouldHaveZeroValue", Justification = "Reviewed.")]
    public enum ToastType
    {
        AssignmentInsert = 1,

        AssignmentDelete = 2,

        MatchCanceled = 6
    }
}