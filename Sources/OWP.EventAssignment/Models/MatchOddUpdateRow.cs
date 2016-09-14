namespace OWP.EventAssignment.Models
{
    using Fanex.NAP.OWP.Core.Extensions.XMLExtensions;

    [XMLName("Row")]
    public class MatchOddUpdateRow
    {
        public int Choice { get; set; }

        public double Odds { get; set; }
    }
}