namespace Fanex.NAP.OWP.EventManagement.Enumerations
{
    using System.Diagnostics.CodeAnalysis;

    [SuppressMessage("Microsoft.Design", "CA1008:EnumsShouldHaveZeroValue", Justification = "Reviewed.")]
    public enum FilterFieldType
    {
        EventDate = 1,
        KOTime,
        League,
        HomeTeam,
        AwayTeam,
        MaxBet,
        Spread,
        Assignee,
        TV,
        Channel,
        WatchBet,
        Agent,
        OtherProvider,
        Provider,
        Phone,
        IsSelected,
        MatchNumber,
        Remark,
        AssigneeLocation,
        MatchStatus
    }
}