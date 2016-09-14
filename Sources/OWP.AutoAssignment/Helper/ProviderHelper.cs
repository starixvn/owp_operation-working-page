namespace OWP.AutoAssignment.Helper
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Enum;

    internal class OrderProviderModel
    {
        public int ProviderId { get; set; }

        public int IndexWithinString { get; set; }
    }

    public static class ProviderHelper
    {
        public static IList<int> DetectIndexAndOrderProviderSpecial(string providerString)
        {
            var providerModel = new List<OrderProviderModel>
            {
                BuildModel((int) Provider.Ipsd,
                    providerString.IndexOf("ipsd", StringComparison.CurrentCultureIgnoreCase)),
                BuildModel((int) Provider.Ipsd,
                    providerString.IndexOf("bg", StringComparison.CurrentCultureIgnoreCase)),
                BuildModel((int) Provider.Rb2,
                    providerString.IndexOf("rb2", StringComparison.CurrentCultureIgnoreCase)),
                BuildModel((int) Provider.Rts,
                    providerString.IndexOf("rts", StringComparison.CurrentCultureIgnoreCase)),
                BuildModel((int) Provider.Bet,
                    providerString.IndexOf("bet", StringComparison.CurrentCultureIgnoreCase))
            };

            var orderProvider = providerModel
                .Where(p => p.IndexWithinString > -1)
                .OrderBy(p => p.IndexWithinString)
                .Select(p => p.ProviderId)
                .Distinct()
                .ToList();
            if (!orderProvider.Any() && providerString.Length > 0)
            {
                orderProvider.Add((int)Provider.Other);
            }
            return orderProvider;
        }

        private static OrderProviderModel BuildModel(int providerId, int indexWithinString) => new OrderProviderModel
        {
            ProviderId = providerId,
            IndexWithinString = indexWithinString
        };
    }
}