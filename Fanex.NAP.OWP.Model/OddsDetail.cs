namespace Fanex.NAP.OWP.Model
{
    public class OddsDetail
    {
        public int Id { get; set; }

        public int OWPMatchId { get; set; }

        public int Bettype { get; set; }

        public decimal? Handicap { get; set; }

        public byte? TeamChoice { get; set; }

        public byte Choice { get; set; }

        public decimal? Odds { get; set; }

        public bool IsInsert { get; set; }
    }
}
