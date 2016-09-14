namespace OWP.Utils
{
    using System;
    using System.Linq;

    public static class StringExtension
    {
        public static bool IsContainsIgnoreCase(this string @this, string value)
        {
            return @this.IndexOf(value, StringComparison.OrdinalIgnoreCase) >= 0;
        }

        public static string ConvertNullToEmpty(string value)
        {
            return string.IsNullOrEmpty(value)
                ? string.Empty
                : value.Trim();
        }

        public static string RemoveNonAlphaCharacters(string source)
           => new string(source?.Where(char.IsLetter).ToArray());

    }
}