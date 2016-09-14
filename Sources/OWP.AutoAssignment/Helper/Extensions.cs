using System;

namespace OWP.AutoAssignment.Helper
{
    public static class Extensions
    {
        public static bool CaseInsensitiveContains(this string text, string value,
            StringComparison stringComparison = StringComparison.CurrentCultureIgnoreCase)
        => text.IndexOf(value, stringComparison) >= 0;
    }
}
