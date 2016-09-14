namespace Fanex.NAP.OWP.TaskScheduling.Misc
{
    using System;

    public static class StringExtension
    {
        public static bool IsContains(this string super, string child)
        {
            return super.IndexOf(child, StringComparison.OrdinalIgnoreCase) >= 0;
        }
    }
}