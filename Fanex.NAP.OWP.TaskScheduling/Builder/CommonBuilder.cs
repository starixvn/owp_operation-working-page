using Fanex.NAP.OWP.TaskScheduling.Converter;
using System;
using System.Linq;
using Fanex.NAP.OWP.TaskScheduling.Misc;
using Olympus.InfoSiteClient.Models;

namespace Fanex.NAP.OWP.TaskScheduling.Builder
{
    public static class CommonBuilder
    {
        private static readonly DateTime MinDate = new DateTime(2000, 1, 1);

        public static int? BuildMatchId(CommonMatchEx infositeMatch)
        {
            int? matchId = null;
            if (infositeMatch.ext_info?.create_match_id != 0)
            {
                matchId = infositeMatch.ext_info.create_match_id;
            }

            return matchId;
        }

        public static DateTime BuildGameDate(CommonMatchEx infositeMatch)
        {
            var exInfoGameDate = infositeMatch.ext_info?.game_date != null && infositeMatch.ext_info.game_date.HasValue
                ? infositeMatch.ext_info.game_date.Value
                : MinDate;

            return DateTimeConverter.ConvertTimeToUTC8(exInfoGameDate);
        }

        public static string BuildInfositeIdExport(string homeName, long infositeId)
            =>  Constant.SpecialOwpName.Any(x => homeName.IsContains(x))
                ? string.Empty 
                : infositeId.ToString();
    }
}
