namespace Fanex.NAP.OWP.Core.Extensions
{
    using System;
    using System.ComponentModel;

    public static class EnumExtensions
    {
        public static string GetEnumDescription(Enum value)
        {
            var valueInString = value.ToString();
            var field = value.GetType().GetField(valueInString);

            if (field == null)
            {
                return valueInString;
            }

            var attributes = (DescriptionAttribute[])field.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return attributes.Length > 0
                ? attributes[0].Description
                : valueInString;
        }
    }
}
