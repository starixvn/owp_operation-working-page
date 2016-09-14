namespace OWP.OddsCompiler.Models
{
    using Utils;

    public class MatchSetting
    {
        public int OWPMatchId { get; set; }

        public int Bettype { get; set; }

        public decimal? MaxBet { get; set; }

        public decimal? Spread { get; set; }

        public string MaxBetToDisplay => MaxBet.ToOWPMaxBetFormat();

        public string SpreadToDisplay => Spread.HasValue ? Spread.ToOWPSpreadFormat() + "%" : string.Empty;
    }
}